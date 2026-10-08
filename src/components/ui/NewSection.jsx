'use client'
import React, { useState, useEffect } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Play,
} from 'lucide-react'
import Image from 'next/image'

const NewSection = () => {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const blogPosts = [
    {
      id: 1,
      title: 'Style Diaries: A Week in Fashion',
      date: '17 May 2024',
      image:
        'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop',
      link: '#',
      category: 'Fashion',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'Chic & Unique: Personalized Fashion Finds',
      date: '28 Feb 2024',
      image:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
      link: '#',
      category: 'Style',
      readTime: '3 min read',
    },
    {
      id: 3,
      title: 'Dress to Impress: Elevate Your Everyday Style',
      date: '15 Aug 2024',
      image:
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop',
      link: '#',
      category: 'Lifestyle',
      readTime: '7 min read',
    },
    {
      id: 4,
      title: 'Street Style Safari: Global Fashion Influences',
      date: '28 Nov 2024',
      image:
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=600&fit=crop',
      link: '#',
      category: 'Trends',
      readTime: '4 min read',
    },
    {
      id: 5,
      title: 'Fashion & Beauty Fusion: The Ultimate Style Guide',
      date: '13 Feb 2024',
      image:
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop',
      link: '#',
      category: 'Beauty',
      readTime: '6 min read',
    },
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % blogPosts.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, blogPosts.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % blogPosts.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + blogPosts.length) % blogPosts.length)
    setIsAutoPlaying(false)
  }

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  const getVisibleSlides = () => {
    const slides = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex - 1 + i + blogPosts.length) % blogPosts.length
      slides.push({
        ...blogPosts[index],
        position: i === 0 ? 'prev' : i === 1 ? 'active' : 'next',
      })
    }
    return slides
  }


  return (
    <div className='relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
      {/* Header */}
      <div className='text-center mb-12'>
        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-red-600 to-indigo-600 bg-clip-text text-transparent mb-4 animate-pulse'>
          Latest Style Stories
        </h2>
        <p className='text-gray-600 text-lg max-w-2xl mx-auto opacity-0 animate-pulse'>
          Discover the latest trends and inspiration from our fashion experts
        </p>
      </div>

      <div
        className='relative overflow-hidden py-8'
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className='flex transition-transform duration-700 ease-out gap-4 sm:gap-6 lg:gap-8'>
          {getVisibleSlides().map((post, index) => (
            <div
              key={post.id}
              className={`flex-none w-full sm:w-full md:w-full lg:w-full max-w-sm mx-auto transition-all duration-700 ease-out ${
                post.position === 'active'
                  ? 'scale-100 sm:scale-105 z-10 opacity-100'
                  : 'scale-90 sm:scale-95 opacity-60 sm:opacity-80'
              }`}
            >
              <div className='relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900 via-red-900 to-indigo-900 group hover:shadow-3xl transition-all duration-700 hover:-translate-y-2'>
                <div className='relative overflow-hidden aspect-[4/3]'>
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={100}
                    height={100}
                    className='w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent'></div>
                  {/* Date Badge */}
                  <div className='absolute top-4 sm:top-6 right-4 sm:right-6 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg'>
                    <span className='text-xs sm:text-sm font-medium text-white'>
                      {post.date}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                </div>

                <div className='absolute left-1/2 bottom-4 sm:bottom-5 w-[calc(100%-32px)] sm:w-[calc(100%-40px)] -translate-x-1/2 p-3 sm:p-4 flex items-center justify-between'>
                  <div className='flex-1 mr-4'>
                    <h4 className='text-lg sm:text-xl font-bold text-white leading-tight'>
                      <a
                        href={post.link}
                        className='hover:text-red-300 transition-colors duration-300'
                      >
                        {post.title}
                      </a>
                    </h4>
                  </div>
                </div>

                {/* Animated Border */}
                <div className='absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-red-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm'></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className='absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/95 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-20 backdrop-blur-sm hover:scale-110 group'
      >
        <ChevronLeft
          size={20}
          className='text-gray-800 group-hover:text-red-600 transition-colors duration-300 sm:w-6 sm:h-6'
        />
      </button>

      <button
        onClick={nextSlide}
        className='absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/95 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-20 backdrop-blur-sm hover:scale-110 group'
      >
        <ChevronRight
          size={20}
          className='text-gray-800 group-hover:text-red-600 transition-colors duration-300 sm:w-6 sm:h-6'
        />
      </button>

    </div>
  )
}

export default NewSection
