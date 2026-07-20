import type { MetadataRoute } from "next";

import { publishedCompetitors } from "@/content/competitors";
import { getPosts } from "@/lib/sanity/queries";
import { absoluteUrl } from "@/lib/site";

/**
 * Generated, not hand-maintained — a hand-written sitemap goes stale the first
 * time the writer publishes. Only pages that are actually ready to index appear:
 * competitor pages gated behind `ready`, posts pulled live from Sanity.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/pricing"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.6 },
    // /privacy and /terms are deliberately absent: they are noindex placeholders.
    // Add them here when real content lands and the noindex is lifted.
  ];

  const competitorRoutes: MetadataRoute.Sitemap = publishedCompetitors().map((competitor) => ({
    url: absoluteUrl(`/vs/${competitor.slug}`),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...competitorRoutes, ...postRoutes];
}
