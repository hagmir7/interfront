import React from 'react';
import { format } from 'date-fns';
import { api } from '@/lib/api';
import { User } from 'lucide-react';

const PageComponent = async ({slug}) => {

  const response = await api.get(`pages/${slug}`);
  const page = await response.data;
  return (
    <div className='min-h-screen mx-auto max-w-7xl py-6'>
      <article className='bg-white md:rounded-2xl p-2 md:p-6 shadow-sm mb-8'>
        <h1 className='text-xl md:text-3xl font-bold mb-4 leading-tight'>
          {page.title}
        </h1>

        <div className='flex flex-wrap gap-4 mb-6 text-sm text-gray-600'>
          <span className='bg-red-50 text-red-600 px-3 py-1 rounded-lg'>
            {format(page.created_at, 'MMM dd, yyyy')}
          </span>
          <span className='flex items-center gap-1'>
            <User size={16} />
            Par{' '}
            <span className='hover:text-red-600'>
              INTERCOCINA
            </span>
          </span>
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
          dangerouslySetInnerHTML={{ __html: page.content }}
        />

      </article>
    </div>
  )
};

export default PageComponent;
