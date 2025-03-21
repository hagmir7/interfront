import React from 'react';

const BlogSection = () => {
  // Blog post data
  const blogPosts = [
    {
      id: 1,
      title: "Aménagement de cuisine au Marco : Transformer votre espace culinaire",
      shortTitle: "Aménagement de cuisine au Marco : Transformer votr...",
      excerpt: "L'aménagement de cuisine au Marco représente bien plus qu'un simple agencement d...",
      image: "https://intercocina.com/storage/public/01JNZYNBTGWSYNKC7CBKDQB617.png",
      url: "https://intercocina.com/blogs/amenagement-de-cuisine-au-marco-transformer-votre-espace-culinaire"
    },
    {
      id: 2,
      title: "Parquet Stratifié : Le Revêtement de Sol Idéal au Maroc",
      shortTitle: "Parquet Stratifié : Le Revêtement de Sol Idéal au...",
      excerpt: "le parquet stratifié est le revêtement de sol idéal au Maroc. Qualité, prix comp...",
      image: "https://intercocina.com/storage/public/01JMVVY76PG7RM6DB96Q38MDPK.webp",
      url: "https://intercocina.com/blogs/parquet-stratifie-le-revetement-de-sol-ideal-au-maroc"
    },
    {
      id: 3,
      title: "Le Meilleur Cuisiniste au Maroc : Pour une Cuisine Moderne",
      shortTitle: "Le Meilleur Cuisiniste au Maroc : Pour une Cuisine...",
      excerpt: "Intercocina, le meilleur cuisiniste au Maroc, spécialisé dans la fabrication de...",
      image: "https://intercocina.com/storage/public/01JKWH34SD1SMTJ6K2E33EMSXC.webp",
      url: "https://intercocina.com/blogs/le-meilleur-cuisiniste-au-maroc-pour-une-cuisine-moderne"
    }
  ];

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
          {blogPosts.map(post => (
            <div key={post.id} className="col-span-full md:col-span-1">
              <a className="block" href={post.url} target="_blank" rel="noopener noreferrer">
                <div className="overflow-hidden w-full bg-white rounded-lg border">
                  <img 
                    loading="lazy" 
                    className="w-full transform transition-transform duration-300 hover:scale-110" 
                    src={post.image} 
                    alt={post.title}
                  />
                </div>
                <h3 className="pt-4 text-xl font-bold">
                  {post.shortTitle}
                </h3>
                <p className="text-slate-500 text-md">
                  {post.excerpt}
                </p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;