import PasswordForm from "../_components/password-form";
import ClientSection from "../_components/client-section";
import { requireDashboardUser } from "../_lib/session";

export const metadata = { title: "Mot de passe | Espace client" };

export default async function PasswordPage() {
  await requireDashboardUser();
  return (
    <ClientSection title="Mot de passe" description="Choisissez un mot de passe unique pour protéger votre compte.">
      <div className="max-w-xl"><PasswordForm /></div>
    </ClientSection>
  );
}
