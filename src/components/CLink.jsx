"use client";

import Link from "next/link";
import NProgress from "nprogress";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function CLink({ href, children, ...props }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = searchParams ? `${pathname}?${searchParams}` : pathname;
  
  const handleClick = useCallback((e) => {
    // Skip if this is a link to the current URL
    if (href === pathname || href === currentUrl) {
      return;
    }
    
    // Only handle internal links
    if (typeof href === 'string' && href.startsWith('/')) {
      NProgress.start();
      
      // Call the original onClick if it exists
      if (props.onClick) {
        props.onClick(e);
      }
    }
  }, [href, pathname, currentUrl, props.onClick]);

  return (
    <Link href={href} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}