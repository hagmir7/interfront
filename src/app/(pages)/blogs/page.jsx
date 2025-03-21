import Link from "next/link";

const Blogs = async () => {

  const response = await fetch('https://interapi.facepy.com/api/posts')
  if(!response.ok){
    throw new Error('Failed to fetch articles')
  }
  const articles = await response.json();

  return (
    <main>
      <div className='max-w-7xl mx-auto px-4 py-10 overflow-x-hidden md:overflow-visible'>
        <div className='px-4 mx-auto max-w-screen-xl'>
          <h1 className='mb-8 text-2xl font-bold text-gray-900'>
            Derniers blog articles
          </h1>
          <div className='grid gap-12 sm:grid-cols-2 lg:grid-cols-3'>
            {articles.data.map((article, index) => (
              <article key={index} className='w-full'>
                <Link href={`/blogs/${article.slug}`}>
                  <img
                    src={`https://intercocina.com/storage/public/${article.image}`}
                    alt={article.title}
                    className='bg-[#dddddd] border h-72 mb-5 object-cover rounded-lg w-full'
                    title={article.title}
                    loading='lazy'
                  />
                </Link>
                <h2 className='mb-2 text-xl font-bold leading-tight text-gray-900'>
                  <Link href={`/blogs/${article.slug}`}>{article.title}</Link>
                </h2>
                <p className='mb-4 text-gray-500'>{article.description}</p>
                <Link
                  href={`/blogs/${article.slug}`}
                  className='inline-flex items-center font-medium underline underline-offset-4 text-primary-600 hover:no-underline'
                >
                  En savoir plus sur nous →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Blogs
