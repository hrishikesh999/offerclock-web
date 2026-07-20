import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-3xl font-medium">Page not found</h1>
      <p className="mt-4">
        That page doesn&apos;t exist. <Link href="/">Go to the homepage</Link>.
      </p>
    </div>
  );
}
