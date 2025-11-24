import BlogCard from '@/components/ui/BlogCard'
import { api } from '@/lib/api'

const Blogs = async () => {
  try {
    const response = await api.get('posts')
    const articles = response.data 

    return (
      <main className='bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 py-4 md:py-10 overflow-x-hidden md:overflow-visible'>
          <div className='px-4 mx-auto max-w-screen-xl'>
            <h1 className=' mb-2 md:mb-8 text-lg md:text-2xl font-bold text-gray-900'>
              Derniers blog articles
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-7.5'>
              {articles.data?.map((article) => (
                <BlogCard key={article.slug} {...article} />
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  } catch (error) {
    console.error('Failed to fetch articles:', error)
    return (
      <main className='bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 py-10'>
          <p>Failed to load articles. Please try again later.</p>
        </div>
      </main>
    )
  }
}

export default Blogs
