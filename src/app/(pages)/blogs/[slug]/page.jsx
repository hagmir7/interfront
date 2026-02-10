import React from 'react';
import { format } from 'date-fns';
import { Search, User, Facebook, Instagram, Twitter, Linkedin, ChevronRight } from 'lucide-react';
import { api } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import CLink from '@/components/CLink';
import Image from 'next/image';

export async function generateMetadata({ params }) {
  const { slug } = await params

  try {
    const response = await api.get(`posts/${slug}`)
    const article = await response.data

    return {
      title: article.title || `Blog ${slug}`,
      description:
        article.description || `Ceci est le blog ${slug}`,
    }
  } catch (error) {
    return {
      title: `Blog ${slug}`,
      description: `Ceci est le blog ${slug}`,
    }
  }
}

const BlogPage = async ({ params }) => {
  const categories = [
    { name: 'Caissons Blanc 18', count: 10 },
    { name: 'Caissons Hydrofuge 22', count: 5 },
    { name: 'Facads et Portes', count: 17 },
    { name: 'Parquet et Sols', count: 13 },
    { name: 'Placards', count: 6 },
    { name: 'Accessoires de cuisine', count: 17 },
    { name: 'Plant de travail', count: 13 },
    // { name: 'Veste', count: 6 },
    // { name: 'Manteau', count: 22 },
  ]


  const { slug } = await params;

  const response = await api.get(`posts/${slug}`);
  
  const article = await response.data;



  // Related Artilces
  const lastRespons = await api.get(`posts`)

  const relatedPosts = await lastRespons.data.data

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto md:px-4 md:py-8'>
        <div className='flex flex-col lg:flex-row gap-8 justify-center'>
          {/* Barre latérale */}
          <div className='lg:w-1/3 lg:order-1 order-2'>
            <aside className='sticky top-8 space-y-8'>
              {/* Recherche */}
              <div className='bg-white rounded-2xl p-6 shadow-sm'>
                <div className='text-lg font-semibold mb-4'>Recherche</div>
                <div className='relative'>
                  <input
                    type='text'
                    placeholder='Rechercher ici'
                    className='w-full py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500'
                  />
                  <button className='absolute right-3 top-1/2 transform -translate-y-1/2 text-red-600 hover:text-red-800'>
                    <Search size={20} />
                  </button>
                </div>
              </div>

              {/* Catégories */}
              <div className='bg-white rounded-2xl p-6 shadow-sm'>
                <div className='text-lg font-semibold mb-4'>Catégorie</div>
                <ul className='space-y-2'>
                  {categories.map((category, index) => (
                    <li
                      key={index}
                      className='flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0'
                    >
                      <a
                        href='#'
                        className='text-gray-700 hover:text-red-600 transition-colors'
                      >
                        {category.name}
                      </a>
                      <span className='text-sm text-gray-500'>
                        ({category.count})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          {/* Contenu principal */}
          <div className='lg:w-2/3 lg:order-2 order-1'>
            <article className='bg-white md:rounded-2xl p-2 md:p-6 shadow-sm mb-8'>
              <h1 className='text-xl md:text-3xl font-bold mb-4 leading-tight'>
                {article.title}
              </h1>

              <div className='flex flex-wrap gap-4 mb-6 text-sm text-gray-600'>
                <span className='bg-red-50 text-red-600 px-3 py-1 rounded-lg'>
                  {format(article.created_at, 'MMM dd, yyyy')}
                </span>
                <span className='flex items-center gap-1'>
                  <User size={16} />
                  Par{' '}
                  <span className='hover:text-red-600'>
                    INTERCOCINA
                  </span>
                </span>
              </div>

              <div className='mb-8'>
                <Image
                  src={`https://interapi.facepy.com/storage/${article.image}`}
                  className='w-full rounded-2xl mb-3 '
                  alt={article.title}
                  width={1000}
                  height={1000}
                />
              </div>
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
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              <div className='flex flex-wrap justify-between items-center py-4 border-t border-gray-200'>
                <div className='flex gap-2'>
                  <a
                    href='#'
                    className='w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700'
                  >
                    <Facebook size={16} />
                  </a>
                  <a
                    href='#'
                    className='w-8 h-8 bg-pink-600 text-white rounded-lg flex items-center justify-center hover:bg-pink-700'
                  >
                    <Instagram size={16} />
                  </a>
                  <a
                    href='#'
                    className='w-8 h-8 bg-blue-400 text-white rounded-lg flex items-center justify-center hover:bg-blue-500'
                  >
                    <Twitter size={16} />
                  </a>
                  <a
                    href='#'
                    className='w-8 h-8 bg-blue-800 text-white rounded-lg flex items-center justify-center hover:bg-blue-900'
                  >
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>
            </article>

            <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-7.5 lg:gap-y-9 mt-5 p-2 md:p-0'>
              {article.products.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </div>

            {/* Articles similaires */}
            <div className='my-8 p-2 md:p-0'>
              <h4 className='text-lg md:text-2xl font-semibold mb-2 md:mb-6'>
                Articles Similaires
              </h4>
              <div className='grid md:grid-cols-2 gap-6 '>
                {relatedPosts.map((post) => (
                  <div
                    key={post.slug}
                    className='bg-white rounded-2xl overflow-hidden md:shadow-sm'
                  >
                    <Image
                      src={`https://interapi.facepy.com/storage/${post.image}`}
                      alt=''
                      className='w-full h-80 object-cover'
                      width={500}
                      height={500}
                    />
                    <div className='bg-red-500 p-3 text-white'>
                      <div className='mb-3'>
                        <span className='bg-white text-gray-800 px-3 py-1 rounded-lg text-xs'>
                          {format(post.created_at, 'MMM dd, yyyy')}
                        </span>
                      </div>
                      <h4 className='text-md md:text-lg font-semibold mb-4 h-8 md:h-12'>
                        {post.title}
                      </h4>
                      <CLink
                        href={`/blogs/${post.slug}`}
                        className='flex items-center gap-2 text-md hover:text-gray-50 justify-end'
                      >
                        Lire Plus <ChevronRight size={16} />
                      </CLink>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default BlogPage;
