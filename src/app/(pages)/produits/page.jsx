
import ShopCards from '@/components/ShopCards';



export const metadata = {
  title: 'Collections des produits',
  description: 'Conseils, idées et astuces pour aménager votre salle de bain, dressing et placards sur mesure avec style et praticité.',
  keywords: 'Produits, conseils aménagement, inspiration décoration, astuces rangement, salle de bain, dressing, placards, mobilier sur mesure, Intercocina',


  alternates: {
    canonical: `/shop`,
  },
};


export default async function page() {
  return (
    <div className="container mx-auto md:p-4">
      <ShopCards />
    </div>
  );
}
