// Netlify Edge Function: geo-hide
// -----------------------------------------------------------------------------
// Removes selected project cards from the /projects page for visitors located in
// Pakistan, BEFORE the HTML leaves Netlify's edge. PK visitors never receive the
// content — it isn't on screen and isn't in view-source. Everyone else sees it.
//
// Implementation note: Netlify's edge runtime (Deno) does NOT provide a global
// HTMLRewriter (that's a Cloudflare Workers API), so this does plain string /
// JSON processing instead. The whole thing is wrapped in a fail-open try/catch:
// if anything goes wrong, the original page is returned unmodified rather than
// crashing the request.
//
// How it targets a card:
//   • The Vue template stamps `data-geo-hide="PK"` on any project whose data
//     entry has `hideInPK: true` (see data/projects.ts + pages/projects/index.vue).
//   • The card root has no href, so it renders as <article ... data-geo-hide="PK">
//     (or <a> if it ever gets a link). Its inner content contains no nested
//     element of the same tag, so a non-greedy match to the first matching close
//     tag removes exactly that card.
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
    return raw; // On any parse issue, leave the metadata untouched.
  }
}

export default async (request: Request, context: Context): Promise<Response> => {
  const response = await context.next();

  try {
    // Only act for Pakistan visitors, on HTML responses.
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
