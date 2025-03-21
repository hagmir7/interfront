import React from 'react';

function CategorySection() {
  const products = [
    {
      imageUrl: 'https://laca.ma/storage/01JMDBDHC2XMSGCYAVWFWTEV37.jpg',
      title: 'Meuble de cuisine',
      description: 'Ajoutez une touche de modernité et de chaleur à votre intéri...',
      link: 'https://laca.ma/category/parquet-classe-31ac3-5',
      badge: 'Nouvelle arrivée'
    },
    {
      imageUrl: 'https://laca.ma/storage/01JMDBFZ8EQZHST1Z8VBN5T9HD.jpg',
      title: 'Revêtement et Sole',
      description: 'Le parquet Classe 32/AC4 est un revêtement stratifié polyval...',
      link: 'https://laca.ma/category/parquets-classe-32ac4-5',
      badge: 'Populaire'
    },
    {
      imageUrl: 'https://laca.ma/storage/01JMDBJ5Y2YQA1JW3KVX06APPE.jpg',
      title: 'Placards et Dressings',
      description: 'Le parquet Classe 33/AC5 est conçu pour les espaces à trafic...',
      link: 'https://laca.ma/category/parquet-classe-33ac5-5',
      badge: 'Premium'
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">La collection des porduits Intercocina.</h2>
        <p className="text-gray-600 max-w-4xl mx-auto">Que vous recherchiez le style, la fonctionnalité ou la qualité, notre gamme de produits a tout pour plaire. Explorez dès maintenant pour dénicher vos favoris.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {products.map((product, index) => (
          <div
            key={index}
            className="relative h-[320px] overflow-hidden rounded-2xl shadow-lg transform transition-transform duration-500 hover:-translate-y-2"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
              style={{ backgroundImage: `url(${product.imageUrl})` }}
            ></div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            
            <div className="relative h-full p-8 flex flex-col justify-between z-10">
              <div>
                <span className="inline-block px-4 py-1.5 bg-white/90 text-gray-800 text-sm font-semibold rounded-full backdrop-blur-sm shadow-sm">
                  {product.badge}
                </span>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-3xl font-bold text-white leading-tight drop-shadow-md">
                  {product.title}
                </h3>
                <p className="text-white/90 text-sm max-w-md">
                  {product.description}
                </p>
                
                <a 
                  href={product.link}
                  className="group inline-flex items-center gap-2 mt-4 px-6 py-3 bg-white text-gray-800 rounded-lg font-medium transition-all duration-300 hover:bg-red-500 hover:text-white"
                  aria-label={`Acheter ${product.title}`}
                >
                  <span>Acheter maintenant</span>
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center flex items-center justify-center">
        <a href="" className="btn btn-primary flex items-center justify-center gap-2">
          Voir toutes nos collections
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  );
}

export default CategorySection;