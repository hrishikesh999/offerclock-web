import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextBlock } from "next-sanity";

import { JsonLd } from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema, graph } from "@/lib/schema";
import { getPost, getPostSlugs } from "@/lib/sanity/queries";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt ?? undefined;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const structuredData = graph(
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
    articleSchema({
      title: post.title,
      description: post.seoDescription ?? post.excerpt,
      path: `/blog/${post.slug}`,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      authorName: post.authorName,
      imageUrl: post.coverImageUrl,
    }),
  );

  return (
    <article className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="text-3xl font-medium">{post.title}</h1>
      <p className="mt-2 text-sm">
        {/* Visible dates, not just metadata — answer engines weigh on-page recency signals. */}
        <time dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          })}
        </time>
        {post.authorName && <> · {post.authorName}</>}
      </p>

      <div className="mt-10 space-y-4">
        <PortableText value={post.body as PortableTextBlock[]} />
      </div>

      <JsonLd data={structuredData} />
    </article>
  );
}
