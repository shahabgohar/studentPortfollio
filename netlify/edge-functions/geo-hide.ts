// Netlify Edge Function: geo-hide
// -----------------------------------------------------------------------------
// Removes selected project cards from the /projects page for visitors located in
// Pakistan, BEFORE the HTML leaves Netlify's edge. PK visitors never receive the
// content — it isn't on screen and isn't in view-source. Everyone else sees it.
//
// How it targets a card:
//   • The Vue template stamps `data-geo-hide="PK"` on any project whose data
//     entry has `hideInPK: true` (see data/projects.ts + pages/projects/index.vue).
//   • This function removes every element carrying that attribute via HTMLRewriter
//     (which is available in Netlify's Deno-based edge runtime).
//
// It also scrubs matching entries from the JSON-LD structured data so the hidden
// project isn't readable in the page's machine-readable metadata either.
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
      // Re-number positions so the list stays contiguous.
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

  // Only rewrite HTML responses.
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) return response;

  // Netlify provides the resolved visitor geo. Bail out unless it's Pakistan.
  const country = context.geo?.country?.code;
  if (country !== "PK") return response;

  // Buffer per <script type="application/ld+json"> block. Scripts are processed
  // in document order and each completes before the next, so a single buffer
  // that resets on the final text chunk is safe.
  let ldBuffer = "";

  return new HTMLRewriter()
    // Remove the visible project card(s).
    .on('[data-geo-hide="PK"]', {
      element(el) {
        el.remove();
      },
    })
    // Strip the hidden project from JSON-LD structured data.
    .on('script[type="application/ld+json"]', {
      text(chunk) {
        ldBuffer += chunk.text;
        if (chunk.lastInTextNode) {
          chunk.replace(scrubLdJson(ldBuffer), { html: false });
          ldBuffer = "";
        } else {
          chunk.replace("", { html: false });
        }
      },
    })
    .transform(response);
};

export const config: Config = {
  path: ["/projects", "/projects/"],
};
