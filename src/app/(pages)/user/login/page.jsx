import LoginForm from "@/components/LoginForm";
import { Suspense } from "react";

export const metadata = {
  title: 'Connexion | Intercocina',
  description:
    'Connectez-vous à votre espace client Intercocina pour accéder à vos projets de cuisines, dressings et meubles sur mesure. Consultez vos devis.',

  keywords: [
    'Intercocina connexion',
    'login Intercocina',
    'espace client',
    'connexion compte',
    'cuisine sur mesure',
    'placard sur mesure',
    'dressing sur mesure',
    'suivi commande',
    'devis cuisine',
    'mobilier sur mesure',
    'aménagement intérieur',
    'Intercocina Maroc',
  ],

   alternates: {
      canonical: `/user/login`,
    },
}


export default function LoginPage() {
  return (
    <div className="md:flex items-center justify-center bg-gray-100 dark:bg-gray-950 md:px-4 md:py-8">
      <Suspense fallback={
        <div className="flex items-center justify-center gap-2 text-gray-400">
          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
          </svg>
          <span className="text-sm">Chargement...</span>
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}