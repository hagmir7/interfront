import OnboardingContent from "@/components/OnboardingContent";
import { Suspense } from "react";


export const metadata = {
  title: "Créer votre compte — Onboarding",
  description: "Configurez votre espace personnel en quelques étapes simples.",
};



export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100" />}>
      <OnboardingContent />
    </Suspense>
  );
}