'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

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
      const res = await fetch(
        `http://localhost:8000/api/search?search=${encodeURIComponent(
          searchTerm
        )}`
      )
      if (!res.ok) throw new Error('Failed to fetch')

      const data = await res.json()
      setArticles(data)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchArticles(query)
    }, 500) // debounce

    return () => clearTimeout(delayDebounce)
  }, [query])

  return (
    <div className='flex-1 max-w-xl mx-4 hidden lg:block z-50'>
      <div className='relative'>
        <button className='absolute left-3 top-1/2 -translate-y-1/2'>
          {loading ? (
            <svg
              aria-hidden='true'
              className='w-6 h-6 mt-1 text-gray-500 animate-spin fill-blue-600'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M100 50.5908C100 78.2051...' fill='currentColor'></path>
              <path d='M93.9676 39.0409C96.393...' fill='currentFill'></path>
            </svg>
          ) : (
            <svg
              className='w-5 h-5 text-gray-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              ></path>
            </svg>
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
                  onClick={()=> setArticles([])}
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
