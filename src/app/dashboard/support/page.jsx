import ReclamationForm from "@/components/ReclamationForm";
import ClientSection from "../_components/client-section";
import { requireDashboardUser } from "../_lib/session";

export const metadata = { title: "Réclamation | Espace client" };

export default async function SupportPage() {
  await requireDashboardUser();
  return (
    <ClientSection title="Réclamation" description="Précisez votre numéro de commande et votre demande pour faciliter son traitement.">
      <ReclamationForm />
    </ClientSection>
  );
}
