import ProfileForm from "../_components/profile-form";
import ClientSection from "../_components/client-section";
import { requireDashboardUser } from "../_lib/session";

export const metadata = { title: "Mon profil | Espace client" };

export default async function ProfilePage() {
  const user = await requireDashboardUser();
  const profile = Object.fromEntries(["first_name", "last_name", "name", "email", "phone", "address", "shipping_id", "gender"].map(key => [key, user[key] ?? ""]));
  return (
    <ClientSection title="Mon profil" description="Gardez vos coordonnées et vos informations personnelles à jour.">
      <ProfileForm user={profile} />
    </ClientSection>
  );
}
