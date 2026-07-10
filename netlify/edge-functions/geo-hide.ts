// Netlify Edge Function: geo-hide
// -----------------------------------------------------------------------------
// Removes selected project cards from the /projects page for visitors located in
// Pakistan, BEFORE the HTML leaves Netlify's edge. Netlify's Deno runtime has no
// HTMLRewriter (that's a Cloudflare Workers API), so this does plain string/JSON
// processing. It sets a temporary `x-geo-hide` debug header describing the path
// taken, and fails open (returns the page unmodified) if anything goes wrong.
// -----------------------------------------------------------------------------

import type { Config, Context } from "https://edge.netlify.com";

const HIDE_TITLES = ["Real-time AI voice-agent platform"];

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

  const country = context.geo?.country?.code ?? "none";
  const ct = response.headers.get("content-type") ?? "";

  // Not a Pakistan HTML request — pass through, but report why via debug header.
  if (country !== "PK" || !ct.includes("text/html")) {
    const h = new Headers(response.headers);
    h.set("x-geo-hide", `skip country=${country} ct=${ct.split(";")[0]}`);
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: h,
    });
  }

  let html: string;
  try {
    html = await response.text();
  } catch (e) {
    const h = new Headers(response.headers);
    h.set("x-geo-hide", `text-error ${String(e).slice(0, 60)}`);
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: h,
    });
  }

  let note: string;
  try {
    const had = /data-geo-hide="PK"/.test(html);
    html = html.replace(
      /<(article|a)\b[^>]*\bdata-geo-hide="PK"[^>]*>[\s\S]*?<\/\1>/g,
      "",
    );
    html = html.replace(
      /(<script[^>]*type="application\/ld\+json"[^>]*>)([\s\S]*?)(<\/script>)/g,
      (_m, open, json, close) => open + scrubLdJson(json) + close,
    );
    note = `hid country=${country} marker=${had}`;
  } catch (e) {
    note = `replace-error ${String(e).slice(0, 60)}`;
  }

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("content-encoding"); // body is now decoded plain text
  headers.set("x-geo-hide", note);
  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

export const config: Config = {
  path: ["/projects", "/projects/"],
};
