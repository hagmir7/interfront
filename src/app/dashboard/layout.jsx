import DashboardShell from "./_components/dashboard-shell";
import { requireDashboardUser } from "./_lib/session";

export const metadata = {
  title: "Espace client | Intercocina",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }) {
  const user = await requireDashboardUser();
  const name = user.full_name || [user.first_name, user.last_name].filter(Boolean).join(" ") || user.name || "Mon compte";

  return (
    <DashboardShell user={{ name, email: user.email || "" }}>
      {children}
    </DashboardShell>
  );
}
