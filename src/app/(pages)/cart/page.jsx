import Cart from '@/components/Cart'
import React from 'react'

export const metadata = {
  title: 'Panier - Intercocina',
  description: 'Consultez votre panier Intercocina et vérifiez vos meubles sur mesure avant de finaliser votre commande. Paiement sécurisé et simple.',
  keywords: 'panier Intercocina, meubles sur mesure, commande en ligne, vérification panier, achat sécurisé, finaliser commande, produits Intercocina',
  alternates: {
    canonical: '/cart'
  }
};

function CartPage() {
  return (
    <div>
      <Cart />
    </div>
  )
}

export default CartPage