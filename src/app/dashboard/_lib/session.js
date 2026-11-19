import { cache } from "react";
import { redirect } from "next/navigation";
import { getServerUser } from "@/services/auth.server";

// Shared within a render, never cached across requests or users.
export const requireDashboardUser = cache(async () => {
  const user = await getServerUser();
  if (!user) redirect("/user/login?next=/dashboard");
  return user;
});
