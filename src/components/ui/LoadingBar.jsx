"use client"; // Important! This must be a client component

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import styles

export default function LoadingBar() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    router.prefetch(pathname); // Prefetching pages helps speed up transitions
    handleStart();
    handleStop();
  }, [pathname]);

  return null;
}
