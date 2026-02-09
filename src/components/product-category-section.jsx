import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductCategories = async () => {

    const response = await fetch("https://interapi.facepy.com/api/categories")
    if (!response.ok) {
        throw new Error("Failed to fetch categories")
    }
    const categories = await response.json();
    return (
        <section className="py-12">
            <div className="px-4 py-16 md:max-w-5xl md:mx-auto">
                <h2 className="mb-4 text-2xl font-bold text-center md:text-4xl">
                    La collection des produits Intercocina.
                </h2>
                <p className="text-center text-slate-700 md:text-lg font-semibold">
                    Que vous recherchiez le style, la fonctionnalité ou la qualité, notre gamme de produits a tout pour plaire.
                    Explorez dès maintenant pour dénicher vos favoris.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-2 md:px-4 pb-6 md:pb-20">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {categories.map((category, index) => (
                        <div key={index} className="rounded-xl bg-white shadow-sm">
                            <Link
                                href={`/category/${category.slug}`}
                                className="relative flex h-60 overflow-hidden rounded-t-xl bg-gray-200"
                            >
                                <Image
                                    className="sm:object-cover object-contain w-full h-full bg-gray-200"
                                    src={`https://interapi.facepy.com/storage/${category.image}`}
                                    alt={category.name}
                                    width={500}
                                    height={500}
                                />
                            </Link>
                            <div className="mt-4 pb-5 px-2">
                                <Link href={`/category/${category.slug}`} >
                                    <h3 className="text-lg font-semibold leading-tight text-gray-900 hover:underline">
                                        {category.name}
                                    </h3>
                                </Link>
                                <div className="mt-2 mb-3 flex items-center justify-between">
                                    <p className="w-full">
                                        <span className="text-sm text-slate-900">
                                            {category.description?.slice(0, 70)}...  
                                        </span>
                                    </p>
                                </div>
                                <div className="mt-auto">
                                    <Link href={`/category/${category.slug}`} 
                                        className="inline-flex items-center text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
                                    >
                                        Explorer la catégorie
                                        <svg
                                            className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5l7 7-7 7"
                                            ></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center md:max-w-6xl md:mx-auto gap-4 mt-8">
                    <a href="/shop" className="btn btn-primary flex items-center justify-center gap-2" >
                        Voir Plus
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ProductCategories;