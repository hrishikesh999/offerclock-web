import { createClient } from "next-sanity";

/**
 * Sanity project config. Credentials come from environment only — never inline
 * (PRD §10, mirroring the product's credential-handling discipline).
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01";

/** True once a project id is configured. Lets routes degrade gracefully pre-setup. */
export const sanityConfigured = Boolean(projectId);

export const sanityClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  // CDN is fine because freshness is driven by on-demand revalidation, not polling.
  useCdn: true,
  perspective: "published",
});
