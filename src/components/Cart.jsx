'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Trash } from 'lucide-react';


export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Calculate total price
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Votre panier</h1>
        <p className="text-gray-600">Votre panier est vide</p>
      </div>
    );
  }

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      clearCart();
    } catch (error) {
      console.error('Checkout failed', error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-white shadow-sm rounded-lg mt-3">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <button 
          onClick={clearCart} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Vider le panier
        </button>
      </div>
      
      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center justify-between border-b pb-4 last:border-b-0"
          >
            {/* Product Image */}
            {item.attributes.image && (
              <div className="w-20 h-20 relative">
                <img 
                  src={`https://intercocina.com/storage/public/${item.attributes.image}`} 
                  alt={item.name}
                //   fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded"
                />
              </div>
            )}

            {/* Product Details */}
            <div className="flex-grow mx-4">
              <h2 className="text-lg font-semibold">{item.name.replace("Façade", item.attributes?.attribute?.name)} {item.attributes?.dimension} {item.attributes?.color_name?.name}</h2>
              <p className="text-gray-600">Prix: {item.price} MAD</p>
              
              {/* Additional */}
              {item.color_name && (
                <p className="text-sm text-gray-500">
                  Color: {item.color_name}
                </p>
              )}
              {item.dimension && (
                <p className="text-sm text-gray-500">
                  Dimension: {item.dimension}
                </p>
              )}
            </div>

            {/* Quantity Control */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="bg-gray-200 px-2 rounded disabled:opacity-50"
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="bg-gray-200 px-2 rounded"
              >
                +
              </button>
            </div>

            {/* Remove Button */}
            <button 
              onClick={() => removeFromCart(item.id)}
              className="ml-4 text-red-500 hover:text-red-700 cursor-pointer"
            >
              <Trash size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-6 flex justify-end">
        <div className="w-full max-w-md">
          <div className="flex justify-between mb-2">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-xl font-bold">{total.toFixed(2)} MAD</span>
          </div>
          <button 
            className={`w-full py-3 rounded transition ${
              isCheckingOut 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            onClick={handleCheckout}
            disabled={isCheckingOut}
          >
            {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
}