import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Suspense } from "react";


export const metadata = {
  title: 'Mot de passe oublié | Intercocina',
  description:
    'Réinitialisez votre mot de passe Intercocina afin de retrouver l’accès à votre espace client sécurisé et gérer vos projets de cuisines, dressings et meubles sur mesure.',

  keywords: [
    'mot de passe oublié',
    'réinitialisation mot de passe',
    'Intercocina',
    'récupération compte',
    'connexion espace client',
    'compte client',
    'cuisine sur mesure',
    'mobilier sur mesure',
    'Intercocina Maroc',
  ],

}


export default function Page() {
  return (
    <div className=" md:flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4 py-8">
      <Suspense fallback={
        <div className="flex items-center justify-center gap-2 text-gray-400">
          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
          </svg>
          <span className="text-sm">Chargement...</span>
        </div>
      }>
        <ForgotPasswordForm />
      </Suspense>
    </div>
  );
}