import React from 'react';
import { format } from 'date-fns';
import { User, Facebook, Instagram, Twitter, Linkedin, ChevronRight, MessageCircle, Package } from 'lucide-react';
import { api } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import CLink from '@/components/CLink';
import Image from 'next/image';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://intercocina.com';

export async function generateMetadata({ params }) {
  const { slug } = await params

  try {
    const response = await api.get(`posts/${slug}`)
    const article = await response.data

    return {
      title: article.title || `Blog ${slug}`,
      description: article.description || `Ceci est le blog ${slug}`,
      alternates: {
        canonical: `/blogs/${slug}`,
      },
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
    { name: 'Caissons Blanc 18', count: 10, url: '/category/caissons?type=caisson-bas' },
    { name: 'Caissons Hydrofuge 22', count: 5, url: '/category/caisson-hydrofuge?type=hydrofuge-bas' },
    { name: 'Facads et Portes', count: 17, url: '/category/facade' },
    { name: 'Parquet et Sols', count: 13, url: '/groups/revetement-et-sol' },
    { name: 'Placards', count: 6, url: '/placards' },
    { name: 'Accessoires de cuisine', count: 17, url: '/category/accessoiriser' },
    { name: 'Plant de travail', count: 13, url: '/category/accessoiriser?type=plan-de-travail' },
  ];

  const { slug } = await params;

  const response = await api.get(`posts/${slug}`);

  const article = await response.data;

  // Related Artilces
  const lastRespons = await api.get(`posts`)

  const relatedPosts = await lastRespons.data.data

  // Share
  const articleUrl = `${SITE_URL}/blogs/${slug}`;
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(article.title || '');

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto md:px-4 md:py-8'>
        <div className='flex flex-col lg:flex-row gap-8 justify-center'>
          {/* Barre latérale */}
          <div className='lg:w-1/3 lg:order-1 order-2'>
            <aside className='sticky top-8 space-y-8'>

              {/* Catégories */}
              <div className='bg-white rounded-2xl p-6 shadow-sm'>
                <div className='text-lg font-semibold mb-4'>Catégorie</div>
                <ul className='space-y-2'>
                  {categories.map((category, index) => (
                    <li
                      key={index}
                      className='flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0'
                    >
                      <CLink
                        href={category.url}
                        className='text-gray-700 hover:text-red-600 transition-colors'
                      >
                        {category.name}
                      </CLink>
                      <span className='text-sm text-gray-500'>
                        ({category.count})
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Voir tous les produits Intercocina */}
                <CLink
                  href='/shop'
                  className='mt-6 flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-xl transition-colors'
                >
                  <Package size={18} />
                  Voir tous les produits Intercocina
                </CLink>
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
                  src={`https://app.intercocina.com/storage/${article.image}`}
                  className='w-full rounded-2xl mb-3 '
                  alt={article.title}
                  width={1000}
                  height={1000}
                />
              </div>
              <article
                className='prose prose-lg prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:mb-6 prose-h1:text-black
              prose-h2:text-2xl prose-h2:mt-4 prose-h2:mb-4 prose-h2:text-gray-800 prose-h2:pb-2
              prose-h3:text-xl prose-h3:mt-4 prose-h3:mb-3 prose-h3:text-gray-700
              prose-p:text-gray-600 prose-p:leading-relaxed  prose-p:p-2 prose-p:m-0
              prose-a:text-red-600 prose-a:no-underline prose-a:font-medium hover:prose-a:text-red-800 prose-a:transition-colors
              prose-strong:text-gray-800 prose-strong:font-semibold
              prose-em:text-gray-700 prose-em:italic
              prose-blockquote:border-l-4 prose-blockquote:border-red-300 prose-blockquote:bg-gray-100
              prose-blockquote:rounded-r-lg prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:my-2
              prose-blockquote:text-gray-700 prose-blockquote:italic prose-blockquote:font-medium
              prose-ul:text-gray-600 prose-ol:text-gray-600 prose-ul:py-0 prose-ul:my-0 
              prose-li:p-0 prose-li:m-0  prose-li:leading-relaxed
              prose-code:bg-gray-200 prose-code:text-red-700 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
              prose-pre:bg-gray-100 prose-pre:border prose-pre:border-gray-300 prose-pre:rounded-lg
              prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
              prose-hr:border-gray-300 prose-hr:my-6 

              max-w-none'
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              <div className='flex flex-wrap justify-between items-center py-4 border-t border-gray-200'>
                <div className='flex gap-2'>
                   <a
                    href={shareLinks.facebook}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='Partager sur Facebook'
                    className='w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700'
                  >
                    <Facebook size={16} />
                  </a>
                   <a
                    href={shareLinks.whatsapp}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='Partager sur WhatsApp'
                    className='w-8 h-8 bg-green-500 text-white rounded-lg flex items-center justify-center hover:bg-green-600'
                  >
                    <MessageCircle size={16} />
                  </a>
                  <a
                    href={shareLinks.twitter}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='Partager sur Twitter'
                    className='w-8 h-8 bg-blue-400 text-white rounded-lg flex items-center justify-center hover:bg-blue-500'
                  >
                    <Twitter size={16} />
                  </a>
                   <a
                    href={shareLinks.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='Partager sur LinkedIn'
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
                      src={`https://app.intercocina.com/storage/${post.image}`}
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