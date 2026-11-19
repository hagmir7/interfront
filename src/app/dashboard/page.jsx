import Link from "next/link";
import { LockKeyhole, MapPin, MessageSquare, Package, Percent, Truck, UserRound } from "lucide-react";
import { requireDashboardUser } from "./_lib/session";
import { clientSections } from "./_lib/navigation.mjs";

const icons = { orders: Package, addresses: MapPin, discounts: Percent, profile: UserRound, password: LockKeyhole, tracking: Truck, support: MessageSquare };

export default async function DashboardPage() {
  // Revalidate on page navigation as well as the initial layout render.
  const user = await requireDashboardUser();
  const firstName = user.first_name || "";

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-sm font-medium text-red-600">Vue d’ensemble</p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Bonjour{firstName ? ` ${firstName}` : ""}.</h1>
        <p className="mt-2 text-base leading-relaxed text-slate-500">Vos commandes, vos adresses et votre compte, réunis dans votre espace client.</p>
      </div>

      <section aria-labelledby="dashboard-account" className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 id="dashboard-account" className="text-base font-semibold">Votre compte client</h2>
        <dl className="mt-5 grid gap-5 text-sm sm:grid-cols-3">
          <div><dt className="text-slate-500">Nom</dt><dd className="mt-1 break-words font-medium">{user.full_name || [user.first_name, user.last_name].filter(Boolean).join(" ") || user.name || "Non renseigné"}</dd></div>
          <div><dt className="text-slate-500">E-mail</dt><dd className="mt-1 break-words font-medium">{user.email || "Non renseigné"}</dd></div>
          <div><dt className="text-slate-500">Numéro client</dt><dd className="mt-1 break-words font-medium">{user.code || "Non renseigné"}</dd></div>
        </dl>
      </section>

      <section aria-labelledby="client-shortcuts">
        <h2 id="client-shortcuts" className="mb-4 text-lg font-semibold">Gérer mon espace</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {clientSections.slice(1).map(section => {
            const Icon = icons[section.icon];
            return (
              <Link key={section.href} href={section.href} className="group rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-red-200 hover:bg-red-50/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                <span className="mb-5 inline-flex rounded-xl bg-red-50 p-3 text-red-600"><Icon className="size-5" aria-hidden="true" /></span>
                <h3 className="text-base font-semibold group-hover:text-red-700">{section.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{section.description}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
