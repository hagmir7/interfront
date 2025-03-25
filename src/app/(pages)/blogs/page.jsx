import BlogCard from "@/components/ui/BlogCard";

const Blogs = async () => {

  const response = await fetch('https://interapi.facepy.com/api/posts')
  if(!response.ok){
    throw new Error('Failed to fetch articles')
  }
  const articles = await response.json();

  return (
    <main className="bg-gray-50">
      <div className='max-w-7xl mx-auto px-4 py-10 overflow-x-hidden md:overflow-visible'>
        <div className='px-4 mx-auto max-w-screen-xl'>
          <h1 className='mb-8 text-2xl font-bold text-gray-900'>
            Derniers blog articles
          </h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-7.5'>
            {articles.data.map((article, index) => ( <BlogCard key={index} {...article} /> ))}  
          </div>
        </div>
      </div>
    </main>
  )
}

export default Blogs
