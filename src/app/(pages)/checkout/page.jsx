import CheckoutPage from '@/components/CheckoutPage'
import React from 'react'


export const metadata = {
  title: 'Finalisez votre commande - Intercocina',
  description: 'Finalisez facilement votre commande de meubles sur mesure chez Intercocina. Paiement sécurisé, rapide et simple pour tous vos produits.',
  alternates: {
    canonical: '/checkout'
  }
};

export default function Page() {
  return <CheckoutPage />
}
