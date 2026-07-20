/**
 * Blog post schema, for the Sanity Studio.
 *
 * NOTE ON LOCATION: this file is the schema definition only. The Studio itself
 * is a separate concern the founder deploys once (`npx sanity deploy`), which is
 * a small correction to PRD §5 — the hosted Studio is zero-maintenance at
 * runtime, but schema changes do require a redeploy by the founder.
 *
 * The PRD's proposed `status` field is deliberately omitted: Sanity already has
 * native draft/published state, and a second parallel status field is a
 * reliable way to eventually publish something the writer thought was a draft.
 * Scheduling is handled by `publishedAt` + the query's `<= now()` guard instead.
 */

export const postType = {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule: { required: () => unknown }) => rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule: { required: () => unknown }) => rule.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "One or two sentences. Used on the blog index and as fallback meta description.",
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      description: "A future date keeps the post hidden until then.",
      validation: (rule: { required: () => unknown }) => rule.required(),
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    },
    {
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      // Alt text is required, not optional — accessibility floor per PRD §7.
      fields: [
        {
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (rule: { required: () => unknown }) => rule.required(),
        },
      ],
    },
    { name: "body", title: "Body", type: "array", of: [{ type: "block" }, { type: "image" }] },
    {
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      description: "Overrides the post title in search results. Aim for under 60 characters.",
    },
    {
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 2,
      description: "Overrides the excerpt in search results. Aim for under 155 characters.",
    },
  ],
};

export const authorType = {
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule: { required: () => unknown }) => rule.required(),
    },
    { name: "bio", title: "Bio", type: "text", rows: 3 },
  ],
};
