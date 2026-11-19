import Discounts from "../_components/discounts";
import ClientSection from "../_components/client-section";
import { requireDashboardUser } from "../_lib/session";

export const metadata = { title: "Mes remises | Espace client" };

export default async function DiscountsPage() {
  await requireDashboardUser();
  return (
    <ClientSection title="Mes remises" description="Retrouvez vos remises par famille de produits.">
      <Discounts />
    </ClientSection>
  );
}
