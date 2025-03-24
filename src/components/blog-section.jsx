import Link from 'next/link';
import React from 'react';

const BlogSection = async () => {
  
  const response = await fetch('https://interapi.facepy.com/api/posts/home')
  if(!response.ok){
    throw new Error('Failed to fetch articles')
  }
  const articles = await response.json();

  return (
    <section className="py-12 overflow-x-hidden">
       <div className="px-4 space-y-6 md:max-w-5xl md:mx-auto mb-4">
          <h1 className="pt-10 pb-2 text-2xl font-bold text-center md:text-4xl animate__animated animate__fadeInUp">
              Nos Articles récents
          </h1>
          <p className="text-center text-slate-500 md:text-lg animate__animated animate__fadeInUp">
              Découvrez nos derniers articles et inspirations pour l’aménagement de vos espaces ! Nous partageons ici des conseils, des tendances et des idées pour optimiser votre intérieur avec nos solutions de placards sur mesure.
          </p>
      </div>
      <div className="px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {articles.data.map(post => (
            <div key={post.slug} className="col-span-full md:col-span-1">
              <Link className="block" href={`/blogs/${post.slug}`} rel="noopener noreferrer">
                <div className="overflow-hidden w-full bg-white rounded-lg border">
                  <img 
                    loading="lazy" 
                    className="w-full transform transition-transform duration-300 hover:scale-110" 
                    src={`https://intercocina.com/storage/public/${post.image}`}
                    alt={post.title}
                  />
                </div>
                <h3 className="pt-4 text-xl font-bold">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-md">
                  {post.description}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;