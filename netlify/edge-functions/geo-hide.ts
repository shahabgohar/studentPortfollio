// Netlify Edge Function: geo-hide
// -----------------------------------------------------------------------------
// Removes selected project cards from the /projects page for visitors located in
// Pakistan, BEFORE the HTML leaves Netlify's edge. PK visitors never receive the
// content — it isn't on screen and isn't in view-source. Everyone else sees it.
//
// Netlify's edge runtime (Deno) has no HTMLRewriter (a Cloudflare Workers API),
// so this does plain string/JSON processing. The origin serves compressed HTML,
// so after rewriting the (now decoded) body we must drop `content-encoding` and
// `content-length` and let Netlify re-compress. Everything is wrapped so it fails
// open — if anything goes wrong the original page is returned, never an error.
//
// Targeting: the Vue template stamps `data-geo-hide="PK"` on any project whose
// data entry has `hideInPK: true` (see data/projects.ts + pages/projects/index.vue).
// -----------------------------------------------------------------------------

import type { Config, Context } from "https://edge.netlify.com";

// Titles to strip from JSON-LD for PK visitors. Keep in sync with the
// `hideInPK: true` entries in data/projects.ts.
const HIDE_TITLES = ["Real-time AI voice-agent platform"];

/** Remove any ItemList entries whose item.name matches a hidden title. */
function scrubLdJson(raw: string): string {
  try {
    const data = JSON.parse(raw);
    const list = data?.mainEntity?.itemListElement;
    if (Array.isArray(list)) {
      const kept = list.filter(
        (entry: any) => !HIDE_TITLES.includes(entry?.item?.name),
      );
      kept.forEach((entry: any, i: number) => {
        if (entry && typeof entry === "object") entry.position = i + 1;
      });
      data.mainEntity.itemListElement = kept;
    }
    return JSON.stringify(data);
  } catch {
    return raw;
  }
}

export default async (request: Request, context: Context): Promise<Response> => {
  const response = await context.next();

  try {
    const country = context.geo?.country?.code;
    if (country !== "PK") return response;

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) return response;

    let html = await response.text();

    // 1) Remove the visible project card(s) marked for PK.
    html = html.replace(
      /<(article|a)\b[^>]*\bdata-geo-hide="PK"[^>]*>[\s\S]*?<\/\1>/g,
      "",
    );

    // 2) Strip the hidden project from JSON-LD structured data.
    html = html.replace(
      /(<script[^>]*type="application\/ld\+json"[^>]*>)([\s\S]*?)(<\/script>)/g,
      (_m, open, json, close) => open + scrubLdJson(json) + close,
    );

    const headers = new Headers(response.headers);
    headers.delete("content-length"); // body length changed
    headers.delete("content-encoding"); // body is now decoded plain text
    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  } catch {
    // Fail open: never break the page if hiding fails for any reason.
    return response;
  }
};

export const config: Config = {
  path: ["/projects", "/projects/"],
};
