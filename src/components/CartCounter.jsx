
'use client'

import { useCart } from '@/context/CartContext'
import React, { useEffect, useState } from 'react'

function CartCounter() {
  const { countItemsInCart } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className='absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2'>
      {mounted ? countItemsInCart() : 0}
    </div>
  )
}

export default CartCounter
