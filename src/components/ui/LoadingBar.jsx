"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

export function LoadingBar() {
  const pathname = usePathname();

  return (
    <Suspense fallback={null}>
      <LoadingBarWithParams pathname={pathname} />
    </Suspense>
  );
}

function LoadingBarWithParams({ pathname }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.configure({
      showSpinner: true,
      minimum: 0.1,
      easing: "ease",
      speed: 300,
      trickleSpeed: 100,
    });

    const handleAnchorClick = (e) => {
      const target = e.target.closest("a");
      if (target && target.getAttribute("href")?.startsWith("/")) {
        const href = target.getAttribute("href");

        if (href === pathname || href === `${pathname}${searchParams ? `?${searchParams}` : ""}`) {
          return;
        }

        NProgress.start();
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
      NProgress.done();
    };
  }, [pathname, searchParams]);

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  return null;
}
