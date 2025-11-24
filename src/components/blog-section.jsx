import React from 'react';
import BlogCard from './ui/BlogCard';
import Link from 'next/link';

const BlogSection = async () => {
  
  const response = await fetch('https://interapi.facepy.com/api/posts/home')
  if(!response.ok){
    throw new Error('Failed to fetch articles')
  }
  const articles = await response.json();

  return (
    <section className="py-12 overflow-x-hidden">
       <div className="px-4 space-y-6 md:max-w-5xl md:mx-auto mb-4">
          <h2 className="pt-10 text-2xl font-bold text-center md:text-4xl animate__animated animate__fadeInUp">
              Nos Articles récents
          </h2>
          <p className="text-center text-slate-500 md:text-lg animate__animated animate__fadeInUp">
              Nous partageons ici des conseils, des tendances et des idées pour optimiser votre intérieur avec nos solutions de placards sur mesure.
          </p>
      </div>
      <div className="px-2 md:px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-7.5">
          {articles.map(post => <BlogCard key={post.slug} {...post} />)}
        </div>
        <div className="flex flex-col justify-center gap-10 px-4 py-18 md:flex-row">
          <Link href="/blogs" className="btn btn-primary text-center">Voir Plus</Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;