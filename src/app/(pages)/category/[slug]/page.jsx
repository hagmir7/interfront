import ProductCard from '@/components/ProductCard';
import ProductFilter from '@/components/ProductFilter';
import Link from 'next/link';

// Dynamic metadata
export async function generateMetadata({ params, searchParams }) {
    const { slug } = params;
    const baseUrl = "https://intercocina.com";

    // Fetch category
    const response = await fetch(`https://interapi.facepy.com/api/categories/${slug}`);
    if (!response.ok) {
        return { title: 'Catégorie introuvable', description: 'Erreur lors du chargement de la catégorie.' };
    }
    const category = await response.json();
    const { type = category.types[0]?.slug } = searchParams || {};

    // Fetch product type
    const response2 = await fetch(`https://interapi.facepy.com/api/types/${type}`);
    if (!response2.ok) {
        return { title: 'Type de produit introuvable', description: 'Erreur lors du chargement du type de produit.' };
    }
    const productType = await response2.json();

    return {
        title: `${productType.name} - Nos Produits`,
        description: `Découvrez notre sélection de ${productType.name}. Qualité supérieure et design sur-mesure.`,
        keywords: `${productType.name}, armoires, meubles sur-mesure, rangement`,
        alternates: {
            canonical: `${baseUrl}/category/${slug}?type=${type}`,
        },
    };
}


export default async function CategoryPage({ params, searchParams }) {
    const { slug } = params;

    // Fetch category
    const response = await fetch(`https://interapi.facepy.com/api/categories/${slug}`);
    if (!response.ok) {
        throw new Error('Failed to fetch category');
    }
    const category = await response.json();
    const { type = category.types[0]?.slug } = searchParams || {};

    // Fetch product type
    const response2 = await fetch(`https://interapi.facepy.com/api/types/${type}`);
    if (!response2.ok) {
        throw new Error('Failed to fetch product type');
    }
    const productType = await response2.json();

    return (
        <section className='px-4 py-4 md:flex gap-3 md:max-w-7xl md:mx-auto bg-gray-100'>
            <ProductFilter />
            <div className="w-full md:w-9/12">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-3">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                            <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">{productType.name}</span>
                        </h1>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-4">
                        {Array.isArray(category.types) && category.types.map((product_type, index) => (
                            <Link key={index} href={`/category/${slug}?type=${product_type.slug}`} 
                                aria-label={`Filter products by type: ${type}`}
                                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-full shadow-sm ${product_type.slug === type ? "bg-red-500 text-white border border-red-200" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"} hover:border-gray-300`}>
                                {product_type.name}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7.5 gap-y-9 mt-5'>
                    {
                        productType.products.map((product, index) => (
                            <ProductCard key={index} {...product} />
                        ))
                    }
                </div>
            </div>
        </section>
    );
}
