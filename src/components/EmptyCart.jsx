import React from 'react'
import { ShoppingCart, Heart, Sparkles, ArrowRight } from 'lucide-react'

const EmptyCart = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br rounded-lg from-purple-50 via-white to-blue-50 flex items-center justify-center p-4'>
      <div className='max-w-md w-full'>
        {/* Animated Cart Icon Container */}
        <div className='relative mb-8 flex justify-center'>
          <div className='relative'>
            {/* Floating background circle */}
            <div className='absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full animate-pulse opacity-20 scale-110'></div>

            {/* Main cart container */}
            <div className='relative bg-white rounded-full p-8 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500 hover:scale-105'>
              <ShoppingCart
                className='w-14 h-14 text-gray-400 mx-auto animate-bounce'
                strokeWidth={1.5}
              />

              {/* Floating sparkles */}
              <Sparkles className='absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse' />
              <Sparkles className='absolute -bottom-1 -left-2 w-4 h-4 text-purple-400 animate-pulse delay-300' />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='text-center space-y-6'>
          {/* Main heading */}
          <div className='space-y-2'>
            <h2 className='text-3xl font-bold text-gray-800 tracking-tight'>
              Votre panier est vide
            </h2>
            <p className='text-gray-500 text-lg leading-relaxed'>
              Il semble que vous n'ayez encore rien ajouté à votre panier.
            </p>
          </div>

          {/* Action buttons */}
          <div className='space-y-4 pt-4'>
            <button className='group w-full bg-gradient-to-r from-red-600 to-red-400 hover:bg-red-800  text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2'>
              <span>Commencer mes achats</span>
              <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
            </button>

            <button className='group w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-8 rounded-2xl border-2 border-gray-200 hover:border-purple-300 transition-all duration-300 flex items-center justify-center space-x-2'>
              <Heart className='w-5 h-5 text-red-400 group-hover:text-red-500 transition-colors duration-300' />
              <span>Voir ma liste d'envies</span>
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className='absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse'></div>
        <div className='absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full opacity-20 animate-pulse delay-700'></div>
        <div className='absolute top-1/3 right-5 w-12 h-12 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full opacity-20 animate-pulse delay-1000'></div>
      </div>
    </div>
  )
}

export default EmptyCart
