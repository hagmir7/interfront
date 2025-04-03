
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

export function LoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Configure NProgress
    NProgress.configure({ 
      showSpinner: true,
      minimum: 0.1,
      easing: 'ease', 
      speed: 300,
      trickleSpeed: 100
    });

    // Create handlers for manual navigation events
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.getAttribute('href')?.startsWith('/')) {
        const href = target.getAttribute('href');
        
        // Prevent handling clicks to the current URL
        if (href === pathname || 
            href === `${pathname}${searchParams ? `?${searchParams}` : ''}`) {
          return;
        }
        
        // Start progress for internal links only
        NProgress.start();
      }
    };

    // Add a global click handler for all anchor tags
    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      NProgress.done();
    };
  }, [pathname, searchParams]);

  // End the progress bar when the route actually changes
  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  return null;
}
