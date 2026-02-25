import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const truncate = (s, n = 160) => s.length > n ? s.slice(0, n) + '...' : s;