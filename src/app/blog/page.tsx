import type { Metadata } from "next";
import Link from "next/link";

import { getPosts } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on deadlines, launches, and selling courses without fake urgency.",
  alternates: { canonical: "/blog" },
};

/**
 * Blog index. Served from the root domain at /blog — never a subdomain (PRD Goal 3),
 * so authority from blog content consolidates under getofferclock.com.
 */
export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-3xl font-medium">Blog</h1>

      {posts.length === 0 ? (
        // An empty blog with a working pipeline is fine; thin filler is not (PRD §6).
        <p className="mt-6">No posts yet.</p>
      ) : (
        <ul className="mt-10 space-y-8">
          {posts.map((post) => (
            <li key={post._id}>
              <article>
                <h2 className="text-xl font-medium">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="mt-1 text-sm">
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      timeZone: "UTC",
                    })}
                  </time>
                </p>
                {post.excerpt && <p className="mt-2">{post.excerpt}</p>}
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
