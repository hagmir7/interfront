"use client";

import Link from "next/link";
import NProgress from "nprogress";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useCallback } from "react";

export default function CLink({ href, children, ...props }) {
  const pathname = usePathname();

  return (
    <Suspense fallback={<Link href={href} {...props}>{children}</Link>}>
      <CLinkWithParams href={href} pathname={pathname} {...props}>
        {children}
      </CLinkWithParams>
    </Suspense>
  );
}

function CLinkWithParams({ href, pathname, children, ...props }) {
  const searchParams = useSearchParams();
  const currentUrl = searchParams ? `${pathname}?${searchParams}` : pathname;

  const handleClick = useCallback(
    (e) => {
      if (href === pathname || href === currentUrl) {
        return;
      }
      if (typeof href === "string" && href.startsWith("/")) {
        NProgress.start();
        if (props.onClick) {
          props.onClick(e);
        }
      }
    },
    [href, pathname, currentUrl, props.onClick]
  );

  return (
    <Link href={href} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
