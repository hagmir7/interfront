export const clientSections = [
  { href: "/dashboard", title: "Vue d’ensemble", description: "Retrouvez les accès à votre espace client.", icon: "overview" },
  { href: "/dashboard/orders", title: "Mes commandes", description: "Consultez vos commandes et leur statut.", icon: "orders" },
  { href: "/dashboard/addresses", title: "Mes adresses", description: "Gérez vos adresses de livraison.", icon: "addresses" },
  { href: "/dashboard/discounts", title: "Mes remises", description: "Retrouvez les remises associées à votre compte.", icon: "discounts" },
  { href: "/dashboard/profile", title: "Mon profil", description: "Consultez et modifiez vos informations personnelles.", icon: "profile" },
  { href: "/dashboard/password", title: "Mot de passe", description: "Mettez à jour le mot de passe de votre compte.", icon: "password" },
  { href: "/dashboard/tracking", title: "Suivi de commande", description: "Suivez une commande à partir de son code.", icon: "tracking" },
  { href: "/dashboard/support", title: "Réclamation", description: "Contactez notre équipe au sujet de votre commande.", icon: "support" },
];

export function getClientSection(pathname) {
  return clientSections.find(section => section.href === pathname || (section.href !== "/dashboard" && pathname.startsWith(`${section.href}/`))) || clientSections[0];
}
