'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/lib/api'
import { RotateCw, SearchIcon, } from 'lucide-react'

const Search = () => {
  const [query, setQuery] = useState('')
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)

  const searchArticles = async (searchTerm) => {
    if (!searchTerm) {
      setArticles([])
      return
    }
    setLoading(true)
    try {
      const response = await api.get(`search?search=${encodeURIComponent(searchTerm)}`)

      setArticles(response.data)
    } catch (error) {
      // throw new Error('Failed to fetch', error)
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchArticles(query)
    }, 500)

    return () => clearTimeout(delayDebounce)
  }, [query])

  return (
    <div className='flex-1 max-w-xl mx-4 hidden lg:block z-50'>
      <div className='relative'>
        <button className='absolute left-3 top-1/2 -translate-y-1/2'>
          {loading ? (

            <div role="status">
              <RotateCw
                className="w-5 h-5 text-gray-700 animate-spin"
                style={{ animationDuration: "0.5s" }} // default is 1s
              />
              <span className="sr-only">Loading...</span>
            </div>

          ) : (
            <SearchIcon className='w-5 h-5 text-gray-500' />
          )}
        </button>

        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Rechercher des produits'
          className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white'
        />
      </div>

      {/* Floating Results Grid */}
      {articles.length > 0 && (
        <div className='absolute left-0 w-full mt-2 bg-white border rounded-xl shadow-lg p-4 max-h-[400px] overflow-y-auto z-50'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {articles.map((item) => {
              const imageUrl = item.images?.[0]?.image ? `https://intercocina.com/storage/${item.images[0].image}` : '/placeholder.jpg' // fallback image
              return (
                <Link
                  href={`/product/${item.slug}`}
                  key={item.id}
                  onClick={() => setArticles([])}
                  className='flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 transition'
                >
                  <div className='relative w-16 h-16 flex-shrink-0'>
                    <Image
                      src={imageUrl}
                      alt={item.name}
                      width={64}
                      height={64}
                      className='object-cover rounded-md'
                    />
                  </div>
                  <div>
                    <p className='text-md font-semibold text-gray-800'>
                      {item.name}
                    </p>
                    <p className='text-sm text-gray-500 font-semibold'>
                      {item.price || item.price_format} MAD
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
