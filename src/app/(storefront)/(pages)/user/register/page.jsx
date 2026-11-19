import RegisterForm from '@/components/RegisterForm'

import React, { Suspense } from 'react'


export const metadata = {
  title: 'Créer un compte | Intercocina',
  description:
    'Inscrivez-vous sur Intercocina pour gérer vos projets de cuisine, placards et aménagements sur mesure. Accédez à votre espace client et suivez vos commandes facilement.',
  keywords: [
    'Intercocina',
    'inscription',
    'compte utilisateur',
    'cuisine sur mesure',
    'placard sur mesure',
    'aménagement intérieur',
    'espace client',
    'meubles sur mesure',
  ],

  alternates: {
    canonical: `/user/register`,
  },
}



function page() {
  return (
    <div className="md:p-10 max-w-5xl mx-auto md:flex items-center justify-center bg-gray-100 dark:bg-gray-950 md:px-4 md:py-8">
      <Suspense fallback={<div>Chargement...</div>}>
        <RegisterForm isRegister={true} />
      </Suspense>
    </div>
  )
}

export default page