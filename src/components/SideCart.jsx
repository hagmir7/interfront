'use client'
import React, { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import EmptyCart from './EmptyCart';
import CLink from './CLink';
import CartCounter from './CartCounter';
import Image from 'next/image';

const TVA_RATE = 0.20;
const IMAGE_BASE = 'https://app.intercocina.com/storage/';

const toNumber = (val) => {
  const n = Number(val);
  return Number.isFinite(n) ? n : 0;
};

// Full image URL (unchanged if it already starts with http/https)
const getImageUrl = (path) => {
  if (!path) return null;

  const url = /^https?:\/\//i.test(path)
    ? path
    : IMAGE_BASE + String(path).replace(/^\/+/, '');

  return url.replace(/ /g, '%20');
};

const ShoppingCartSidebar = () => {
  const { cart = [], removeFromCart, updateQuantity } = useCart();
  const { user, discounts } = useAuth();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const getDiscountPercentage = (item) => {
    if (!user) return 0;
    return toNumber(
      discounts?.find(
        (d) => Number(d.family_id) === Number(item.attributes?.family_id)
      )?.percentage
    );
  };

  const getDiscountedUnitPrice = (item) => {
    const price = toNumber(item.price);
    const pct = getDiscountPercentage(item);
    return price * (1 - pct / 100);
  };

  const totalHT = cart.reduce(
    (sum, item) => sum + getDiscountedUnitPrice(item) * toNumber(item.quantity),
    0
  );
  const totalTVA = totalHT * TVA_RATE;
  const totalTTC = totalHT + totalTVA;

  const handleQuantityInput = (item, value) => {
    const qty = parseInt(value, 10);
    // Ignore empty/invalid input and never go below 1
    if (!Number.isFinite(qty) || qty < 1) return;
    updateQuantity(item.id, qty);
  };

  return (
    <>
      <button
        onClick={() => setIsCartOpen(true)}
        aria-label='Ouvrir le panier'
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
              {cart.length === 0 ? (
                <EmptyCart setIsCartOpen={setIsCartOpen} />
              ) : (
                <ul className='space-y-4'>
                  {cart.map((item, index) => {
                    const discountPct = getDiscountPercentage(item);
                    const discountedPrice = getDiscountedUnitPrice(item);
                    const originalPrice = toNumber(item.price);
                    const imageUrl = getImageUrl(item?.attributes?.image);

                    // color_name can be an object ({ name }) or a string
                    const colorName =
                      item.attributes?.color_name?.name ??
                      (typeof item.attributes?.color_name === 'string'
                        ? item.attributes.color_name
                        : null);

                    return (
                      <li
                        key={item.id ?? index}
                        className='py-2 border-b border-gray-200'
                      >
                        <div className='flex items-center'>
                          <div className='w-20 h-20 rounded-3xl overflow-hidden mr-4 flex-shrink-0 bg-gray-100'>
                            {imageUrl && (
                              <Image
                                src={imageUrl}
                                alt={item.name || 'Produit'}
                                className='w-full h-full object-cover'
                                width={100}
                                height={100}
                              />
                            )}
                          </div>

                          <div className='flex-1 mr-4'>
                            <h6 className='mb-2 font-medium text-sm'>
                              <CLink
                                href={`/product/${item.attributes?.slug}`}
                                className='hover:text-red-600 transition-colors'
                              >
                                {item.attributes?.attribute}{' '}
                                {item.name?.replace('Façade', '')}{' '}
                                {item.attributes?.dimension} {colorName}
                              </CLink>
                            </h6>

                            <p className='text-gray-600 text-sm'>
                              Prix:{' '}
                              {discountPct > 0 ? (
                                <>
                                  <span className='line-through text-gray-400 mr-1'>
                                    {originalPrice.toFixed(2)} MAD
                                  </span>
                                  <span className='text-red-500 font-semibold'>
                                    {discountedPrice.toFixed(2)} MAD
                                  </span>
                                  <span className='ml-1 text-xs bg-red-100 text-red-600 rounded px-1'>
                                    -{discountPct}%
                                  </span>
                                </>
                              ) : (
                                <>{originalPrice.toFixed(2)} MAD</>
                              )}
                            </p>

                            <div className='flex items-center gap-2 mt-2'>
                              <div className='flex items-center'>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  disabled={item.quantity <= 1}
                                  aria-label='Diminuer la quantité'
                                  className='w-8 h-8 rounded-full border border-red-600 bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                                >
                                  <Minus size={16} />
                                </button>

                                <input
                                  type='number'
                                  min={1}
                                  value={item.quantity}
                                  onChange={(e) =>
                                    handleQuantityInput(item, e.target.value)
                                  }
                                  className='w-16 h-8 text-center border border-red-600 rounded-full mx-2 bg-gray-50 outline-none text-sm leading-8'
                                />

                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  aria-label='Augmenter la quantité'
                                  className='w-8 h-8 rounded-full border border-red-600 bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors'
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            aria-label='Supprimer'
                            className='w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors'
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Fixed Footer */}
            {cart.length > 0 && (
              <div className='flex-shrink-0 px-4 py-6 border-t bg-white'>
                <div className='p-4 mb-4 bg-gray-50 rounded-lg space-y-2'>
                  <div className='flex items-center justify-between'>
                    <span className='text-gray-600 text-sm'>Total HT</span>
                    <span className='font-medium text-sm'>
                      {totalHT.toFixed(2)} MAD
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-gray-600 text-sm'>TVA (20%)</span>
                    <span className='font-medium text-sm'>
                      {totalTVA.toFixed(2)} MAD
                    </span>
                  </div>
                  <div className='flex items-center justify-between border-t pt-2'>
                    <h5 className='font-bold'>Total TTC</h5>
                    <h5 className='font-bold'>{totalTTC.toFixed(2)} MAD</h5>
                  </div>
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
  );
};

export default ShoppingCartSidebar;