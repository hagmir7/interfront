import sanitizeHtml from "sanitize-html";

// Use only in server components, before passing CMS content to an HTML sink.
export function sanitizeRichHtml(value) {
  return sanitizeHtml(typeof value === "string" ? value : "", {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "img"],
    allowedAttributes: {
      a: ["href", "title"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      th: ["colspan", "rowspan", "scope"],
      td: ["colspan", "rowspan"],
      ol: ["start", "reversed", "type"],
    },
    allowedSchemes: ["https", "http", "mailto", "tel"],
    allowedSchemesByTag: { img: ["https", "http"] },
    allowProtocolRelative: false,
  });
}
