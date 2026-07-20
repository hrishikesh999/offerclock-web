import { groq } from "next-sanity";

import { sanityClient, sanityConfigured } from "./client";

export type PostSummary = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  publishedAt: string;
  updatedAt: string | null;
  authorName: string | null;
};

export type Post = PostSummary & {
  body: unknown;
  seoTitle: string | null;
  seoDescription: string | null;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
};

/**
 * `perspective: "published"` on the client already excludes drafts. The
 * `publishedAt` guard additionally hides posts dated in the future, so the
 * writer can schedule without anything leaking early (PRD §10).
 */
const publishedFilter = `_type == "post" && defined(slug.current) && publishedAt <= now()`;

const summaryFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "updatedAt": _updatedAt,
  "authorName": author->name
`;

const postsQuery = groq`*[${publishedFilter}] | order(publishedAt desc) { ${summaryFields} }`;

const postBySlugQuery = groq`*[${publishedFilter} && slug.current == $slug][0] {
  ${summaryFields},
  body,
  seoTitle,
  seoDescription,
  "coverImageUrl": coverImage.asset->url,
  "coverImageAlt": coverImage.alt
}`;

const slugsQuery = groq`*[${publishedFilter}].slug.current`;

export async function getPosts(): Promise<PostSummary[]> {
  if (!sanityConfigured) return [];
  return sanityClient.fetch<PostSummary[]>(postsQuery, {}, { next: { tags: ["post"] } });
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!sanityConfigured) return null;
  return sanityClient.fetch<Post | null>(
    postBySlugQuery,
    { slug },
    { next: { tags: ["post", `post:${slug}`] } },
  );
}

export async function getPostSlugs(): Promise<string[]> {
  if (!sanityConfigured) return [];
  return sanityClient.fetch<string[]>(slugsQuery, {}, { next: { tags: ["post"] } });
}
