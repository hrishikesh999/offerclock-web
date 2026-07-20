import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity webhook receiver — publishing a post updates the live site without a
 * redeploy (PRD §9, P1). One-time founder setup: create a webhook in Sanity
 * pointing at /api/revalidate with the same secret as SANITY_REVALIDATE_SECRET.
 *
 * parseBody verifies the request signature; an unsigned or mis-signed request is
 * rejected, so the endpoint cannot be used to force cache churn.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "Revalidation secret not configured" }, { status: 500 });
  }

  try {
    const { isValidSignature, body } = await parseBody<{ _type: string; slug?: { current?: string } }>(
      req,
      secret,
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }
    if (!body?._type) {
      return NextResponse.json({ message: "Bad payload" }, { status: 400 });
    }

    // Broad tag refreshes the index and sitemap; the slug tag refreshes the post.
    // Next 16 requires an explicit cache profile; "max" purges immediately.
    revalidateTag("post", "max");
    if (body.slug?.current) {
      revalidateTag(`post:${body.slug.current}`, "max");
    }

    return NextResponse.json({ revalidated: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
