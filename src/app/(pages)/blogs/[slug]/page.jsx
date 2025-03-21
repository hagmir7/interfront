import { Clock } from 'lucide-react';
import React from 'react';
import { format } from 'date-fns';

export async function generateMetadata({ params }) {
  const { slug } = await params;

  return {
    title: `Blog ${slug}`,
    description: `This is the blog ${slug}`,
  }
}


export default async function  BlogPage({ params }) {
  const { slug } = await params;

  const response = await fetch(`https://interapi.facepy.com/api/posts/${slug}`);
  if(!response.ok){
    throw new Error('Failed to fetch articles')
  }
  const article = await response.json();


  return (
    <main>
      <div className='max-w-6xl mx-auto px-4 py-10 overflow-x-hidden md:overflow-visible'>
        <div className='px-4 mx-auto max-w-screen-xl'>
          <h1 className='mb-4 text-2xl font-bold text-gray-900'>
            {article.title}
          </h1>
          <span className='flex items-center mb-3 text-gray-500 gap-2'>
            <Clock /> <span>{format(article.created_at, 'MMM dd, yyyy')}</span>
          </span>
          <div className='w-full'>
            <img
              src={`https://intercocina.com/storage/public/${article.image}`}
              className='w-full rounded-2xl mb-3'
            />
            <article
              className='prose text-lg prose-h2:font-bold prose-h2:text-2xl'
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
