/**
 * Renders a structured-data block. Server component — the JSON is in the
 * initial HTML response, which is what non-JS crawlers and LLM fetchers see.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escaping `<` prevents a `</script>` sequence inside string values from
      // breaking out of the tag. JSON.stringify alone does not handle this.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
