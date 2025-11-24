'use client'
import React, { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import EmptyCart from './EmptyCart';
import CLink from './CLink';
import CartCounter from './CartCounter';
import Image from 'next/image';

const ShoppingCartSidebar = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const [isCartOpen, setIsCartOpen] = useState(false);

  

  return (
    <>
      <button
        onClick={() => setIsCartOpen(true)}
        className='bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors cursor-pointer relative'
      >
        <svg
          className='w-6 h-6'
          xmlns='http://www.w3.org/2000/svg'
          width='32'
          height='32'
          viewBox='0 0 24 24'
        >
          <path
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='M16.5 21a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-8 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M3.71 5.4h15.214c1.378 0 2.373 1.27 1.995 2.548l-1.654 5.6C19.01 14.408 18.196 15 17.27 15H8.112c-.927 0-1.742-.593-1.996-1.452zm0 0L3 3'
          />
        </svg>
        <CartCounter />
      </button>

      {isCartOpen && (
        <div
          className='fixed inset-0 z-50 flex justify-end m-auto'
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className='w-full max-w-md h-full bg-white shadow-md transform translate-x-0 flex flex-col'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Content - Scrollable area */}
            <div className='flex-grow overflow-y-auto py-6 px-4 pb-0'>
              {/* Cart List */}
              <ul className='space-y-4'>
                {cart.map((item) => (
                  <li key={item.id} className='py-2 border-b border-gray-200'>
                    <div className='flex items-center'>
                      <div className='w-20 h-20 rounded-3xl overflow-hidden mr-4 flex-shrink-0'>
                        <Image
                          src={`https://intercocina.com/storage/public/${item.attributes.image}`}
                          alt={item.name}
                          className='w-full h-full object-cover'
                          width={100}
                          height={100}
                        />
                      </div>

                      <div className='flex-1 mr-4'>
                        <h6 className='mb-2 font-medium text-sm'>
                          <CLink
                            href={`/product/${item.attributes.slug}`}
                            className='hover:text-red-600 transition-colors'
                          >
                            {item.attributes.attribute}{' '}
                            {item.name.replace('Façade', '')} {" "}
                            {item.attributes?.dimension}{' '}
                            {item?.attributes?.color_name}
                          </CLink>
                        </h6>
                        <p className='text-gray-600 text-sm md:text-base'>
                          Prix: {item.price} MAD
                        </p>

                        <div className='flex items-center gap-2 mt-2'>
                          <div className='flex items-center'>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className='w-8 h-8 rounded-full border border-red-600 bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors'
                            >
                              <Minus size={16} />
                            </button>
                            <input
                              type='number'
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.id,
                                  parseInt(e.target.value || 0)
                                )
                              }
                              className='w-16 h-8 text-center border border-red-600 rounded-full mx-2 bg-gray-50 outline-none text-sm leading-8'
                            />
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className='w-8 h-8 rounded-full border border-red-600 bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors'
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className='w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors'
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {cart.length === 0 ? <EmptyCart /> : ''}
            </div>

            {/* Fixed Footer */}
            {cart.length > 0 && (
              <div className='flex-shrink-0 px-4 py-6 border-t bg-white'>
                <div className='flex items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg'>
                  <h5 className='font-bold'>Sous-total :</h5>
                  <h5 className='font-bold'>{total.toFixed(2)} MAD</h5>
                </div>

                <div className='w-full' onClick={() => setIsCartOpen(false)}>
                  <CLink
                    href='/checkout'
                    className='py-3 inline-block text-center px-6 text-base font-semibold border border-red-600 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-colors duration-300 w-full'
                  >
                    Passer la commande
                  </CLink>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
};

export default ShoppingCartSidebar;