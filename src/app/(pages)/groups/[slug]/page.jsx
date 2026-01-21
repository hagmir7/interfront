import CLink from "@/components/CLink";
import { api } from "@/lib/api";
import Image from "next/image";


export default async function page({ params }) {

    const { slug } = await params

    const response = await api.get(`groups/${slug}`);

    const group = await response.data;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{group.name}</h1>
                    <p className="text-gray-600 text-base md:text-lg max-w-3xl">{group.description}</p>
                </div>
            </div>

            {/* Products Grid */}
            <section className="px-4 py-4 md:py-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {group.types.map(type => (
                        <div
                            key={type.id}
                            className="group bg-white shadow-xs rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md overflow-hidden"
                        >
                            {/* Image Container */}
                           <CLink href={`/category/${type?.category?.slug}?type=${type.slug}`}>
                             <div className="relative h-60 bg-white border-b flex items-center justify-center overflow-hidden group">
                                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-100 flex items-center justify-center">
                                    <Image
                                        src={`https://intercocina.com/storage/public/${type.image}`}
                                        width={220}
                                        height={420}
                                        alt={group.name}
                                        className="object-contain w-auto h-full transform transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                                    />
                                </div>
                            </div>
                           </CLink>

                            {/* Content */}
                            <div className="p-3">
                                <CLink href={`/category/${type?.category?.slug}?type=${type.slug}`}>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                                    {type.name}
                                </h3>
                                </CLink>

                                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                    {type.description || "Description non disponible"}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                                        {type?.category?.name}
                                    </span>

                                    <CLink href={`/category/${type?.category?.slug}?type=${type.slug}`} className="text-gray-900 hover:text-gray-600 font-medium text-sm flex items-center gap-1.5 transition-colors">
                                     Détails
                                        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </CLink>
                           
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}