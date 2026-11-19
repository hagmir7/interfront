import Orders from "../_components/orders";
import ClientSection from "../_components/client-section";
import { requireDashboardUser } from "../_lib/session";

export const metadata = { title: "Mes commandes | Espace client" };

export default async function OrdersPage() {
  const user = await requireDashboardUser();
  return (
    <ClientSection title="Mes commandes" description="Consultez votre historique et suivez le statut de vos commandes.">
      <Orders user_id={user.id} />
    </ClientSection>
  );
}
