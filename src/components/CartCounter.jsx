'use client'
import { useCart } from '@/context/CartContext';
import React from 'react'

function CartCounter() {
  const { countItemsInCart } = useCart()
  return (
    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2">
        <span>{countItemsInCart()}</span>
    </div>
  )
}

export default CartCounter;