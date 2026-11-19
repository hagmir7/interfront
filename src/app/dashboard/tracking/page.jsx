import Tracking from "@/components/Tracking";
import ClientSection from "../_components/client-section";
import { requireDashboardUser } from "../_lib/session";

export const metadata = { title: "Suivi de commande | Espace client" };

export default async function TrackingPage() {
  await requireDashboardUser();
  return (
    <ClientSection title="Suivi de commande" description="Saisissez votre code de commande pour consulter son avancement.">
      <Tracking />
    </ClientSection>
  );
}
