import Tracking from '@/components/Tracking'
import React from 'react'


export const metadata = {
  title: 'Suivi de Commande',
  description: 'Suivez l’état de votre commande en temps réel.',
  keywords: ['suivi commande', 'tracking', 'commande', 'livraison'],
  alternates: {
    canonical: `/tracking`,
  },
};


export default function page() {
  return (
    <div className='mt-10'>
      <Tracking />
    </div>
  )
}
