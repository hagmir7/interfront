import { ChevronRight } from 'lucide-react';
import { ColorCard } from '@/components/ColorCard';
import CLink from '@/components/CLink';

async function getColors() {
  try {
      const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : "https://interapi.facepy.com";
    const response = await fetch(`${baseURL}/api/view-colors`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch colors');
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching colors:', error);
    return [];
  }
}

export default async function page() {
  const colors = await getColors();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-4 md:py-10 px-2 md:px-4 sm:px-6">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-12 text-center">
          <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-4">
            Une Grande Diversité de Couleurs Tendances
          </h2>
          <p className="text-slate-600 text-lg">
            Une large palette de couleurs tendances pour sublimer une cuisine moderne avec style.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {colors.map((color, index) => (
            <ColorCard key={color.id || index} color={color} />
          ))}
        </div>
      </div>
    </div>
  );
}