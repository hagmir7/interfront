import Addresses from "../_components/addresses";
import ClientSection from "../_components/client-section";
import { requireDashboardUser } from "../_lib/session";

export const metadata = { title: "Mes adresses | Espace client" };

export default async function AddressesPage() {
  await requireDashboardUser();
  return (
    <ClientSection title="Mes adresses" description="Ajoutez et gérez les adresses utilisées pour vos livraisons.">
      <Addresses />
    </ClientSection>
  );
}
