import ProductCard from '@/components/ProductCard';
import { api } from '@/lib/api';
import React from 'react'

export async function generateMetadata({ params }) {
    const { slug } = await params; // no await
    console.log("Slug in metadata:", slug); // => "lacado-offer"

    try {
        const response = await api.get(`collections/${slug}`);
        const collection = response.data;

        return {
            title: collection.title,
            description: collection.description?.slice(0, 160) || "",
            keywords: [collection.title, "collection", "produits", "meubles"],
            openGraph: {
                title: collection.title,
                description: collection.description?.slice(0, 160) || "",
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: collection.title,
                description: collection.description?.slice(0, 160) || "",
            },
        };
    } catch (error) {
        return {
            title: "Collection",
            description: "Découvrez nos collections de produits",
        };
    }
}



export default async function page({ params }) {

    const { slug } = await params;

    const response = await api.get(`collections/${slug}`);

    const collection = await response.data;

    return (
        <div className='container m-auto'>
            <div className='m-auto w-full text-center'>
                <h1 className='text-2xl py-3 font-semibold'> {collection.title}</h1>
                <div className='flex justify-center'>
                    <p className='max-w-2xl text-center'>{collection.description}</p>
                </div>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-x-7.5 lg:gap-y-9 mt-5 p-2 md:p-0'>
                {collection.products.map((product, index) => (
                    <ProductCard key={index} {...product} />
                ))}
            </div>

            <div className='bg-white rounded-xl shadow-xs p-3 mt-3'>
                <article
                    className='prose prose-lg prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:mb-6 prose-h1:text-black
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-gray-800 prose-h2:border-b prose-h2:border-gray-300 prose-h2:pb-2
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-gray-700
              prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-red-600 prose-a:no-underline prose-a:font-medium hover:prose-a:text-red-800 prose-a:transition-colors
              prose-strong:text-gray-800 prose-strong:font-semibold
              prose-em:text-gray-700 prose-em:italic
              prose-blockquote:border-l-4 prose-blockquote:border-red-300 prose-blockquote:bg-gray-100
              prose-blockquote:rounded-r-lg prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:my-8
              prose-blockquote:text-gray-700 prose-blockquote:italic prose-blockquote:font-medium
              prose-ul:text-gray-600 prose-ol:text-gray-600
              prose-li:mb-2 prose-li:leading-relaxed
              prose-code:bg-gray-200 prose-code:text-red-700 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
              prose-pre:bg-gray-100 prose-pre:border prose-pre:border-gray-300 prose-pre:rounded-lg
              prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
              prose-hr:border-gray-300 prose-hr:my-12
              max-w-none'
                    dangerouslySetInnerHTML={{ __html: collection.content }}
                />
            </div>
        </div>
    )
}
