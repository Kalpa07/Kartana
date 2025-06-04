"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = decodeURIComponent(segment)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    return {
      href,
      label,
    };
  });

  return (
    <nav aria-label="Breadcrumb" className="text-lg text-white mt-12 ml-10">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className=" text-grey hover:underline">
            Home
          </Link>
        </li>
        {breadcrumbs.map(({ href, label }, idx) => (
          <li key={href} className="flex items-center gap-2">
            <span className="text-grey">/</span>
            {idx === breadcrumbs.length - 1 ? (
              <span className="font-semibold text-white">{label}</span>
            ) : (
              <Link href={href} className="text-grey hover:underline">
                {label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
