"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LockKeyhole, LogOut, MapPin, Menu, MessageSquare, Package, Percent, Store, Truck, UserRound } from "lucide-react";
import LogoutButton from "@/components/ui/LogoutButton";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { clientSections, getClientSection } from "../_lib/navigation.mjs";

const sectionIcons = { overview: LayoutDashboard, orders: Package, addresses: MapPin, discounts: Percent, profile: UserRound, password: LockKeyhole, tracking: Truck, support: MessageSquare };

const linkClass = "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600";

function DashboardNavigation({ mobile = false }) {
  const currentSection = getClientSection(usePathname());
  const navLink = (href, label, Icon, active = false) => {
    const link = (
      <Link href={href} aria-current={active ? "page" : undefined} className={`${linkClass} ${active ? "bg-red-50 text-red-700 hover:bg-red-100" : "text-slate-600"}`}>
        <Icon className="size-5 shrink-0" aria-hidden="true" />
        {label}
      </Link>
    );
    return mobile ? <SheetClose asChild>{link}</SheetClose> : link;
  };

  return (
    <>
      <Link href="/dashboard" className="mb-8 flex shrink-0 flex-col items-start gap-3 px-3" aria-label="Intercocina — Espace client">
        <Image src="/icons/intercocina-logo.png" alt="Intercocina" width={458} height={265} className="h-auto w-36" priority />
        <span className="text-sm font-medium text-slate-500">Espace client</span>
      </Link>
      <nav aria-label="Navigation de l’espace client" className="min-h-0 flex-1 space-y-1 overflow-y-auto pb-5">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Mon espace</p>
        {clientSections.map(section => <div key={section.href}>{navLink(section.href, section.title, sectionIcons[section.icon], currentSection.href === section.href)}</div>)}
      </nav>
      <nav aria-label="Liens du compte" className="shrink-0 space-y-1 border-t border-slate-100 pt-5">
        {navLink("/", "Voir la boutique", Store)}
        <LogoutButton className={`${linkClass} w-full text-slate-600`}>
          <LogOut className="size-5" aria-hidden="true" />
          Se déconnecter
        </LogoutButton>
      </nav>
    </>
  );
}

export default function DashboardShell({ user, children }) {
  const currentSection = getClientSection(usePathname());
  const initials = user.name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join("").toUpperCase();

  return (
    <div className="min-h-svh bg-slate-50 text-slate-900 [letter-spacing:normal]">
      <a href="#dashboard-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:p-3">Aller au contenu</a>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white px-4 py-7 lg:flex">
        <DashboardNavigation />
      </aside>
      <div className="lg:pl-64">
        <header className="flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <button type="button" aria-label="Ouvrir le menu" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-red-600 lg:hidden"><Menu className="size-5" aria-hidden="true" /></button>
              </SheetTrigger>
              <SheetContent side="left" className="flex w-72 flex-col bg-white px-4 py-7 [letter-spacing:normal]">
                <SheetTitle className="sr-only">Navigation de l’espace client</SheetTitle>
                <SheetDescription className="sr-only">Retrouvez vos commandes, vos adresses et les paramètres de votre compte.</SheetDescription>
                <DashboardNavigation mobile />
              </SheetContent>
            </Sheet>
            <span className="text-sm font-medium text-slate-600">{currentSection.title}</span>
          </div>
          <div className="flex min-w-0 items-center gap-3">
            <div className="hidden min-w-0 text-right sm:block">
              <p className="max-w-56 truncate text-sm font-semibold">{user.name}</p>
              <p className="max-w-56 truncate text-xs text-slate-500">{user.email}</p>
            </div>
            <span aria-label={user.name} className="flex size-10 shrink-0 items-center justify-center rounded-full border border-red-100 bg-red-50 text-sm font-semibold text-red-700">{initials}</span>
          </div>
        </header>
        <main id="dashboard-content" tabIndex={-1} className="mx-auto w-full max-w-7xl p-5 outline-none sm:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
