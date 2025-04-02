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
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 bg-white shadow-sm rounded-lg mt-3">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-xl md:text-2xl font-bold">Your Cart</h1>
        <button 
          onClick={clearCart} 
          className="bg-red-500 text-white px-3 py-1 md:px-4 md:py-2 rounded hover:bg-red-600 transition text-sm md:text-base"
        >
          Vider le panier
        </button>
      </div>
      
      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((item) => (
          <div 
            key={item.id} 
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 last:border-b-0 gap-3"
          >
            {/* Product Image */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {item.attributes.image && (
                <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                  <img 
                    src={`https://intercocina.com/storage/public/${item.attributes.image}`} 
                    alt={item.name}
                    className="object-cover rounded w-full h-full"
                  />
                </div>
              )}

              {/* Product Details */}
              <div className="flex-grow">
                <h2 className="text-base md:text-lg font-semibold">{item.name.replace("Façade", item.attributes?.attribute?.name)} {item.attributes?.dimension} {item.attributes?.color_name?.name}</h2>
                <p className="text-gray-600 text-sm md:text-base">Prix: {item.price} MAD</p>
                
                {/* Additional */}
                <div className="flex flex-wrap gap-x-4 mt-1">
                  {item.color_name && (
                    <p className="text-xs md:text-sm text-gray-500">
                      Color: {item.color_name}
                    </p>
                  )}
                  {item.dimension && (
                    <p className="text-xs md:text-sm text-gray-500">
                      Dimension: {item.dimension}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center w-full sm:w-auto gap-4">
              {/* Quantity Control */}
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-200 px-2 rounded disabled:opacity-50"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
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
                className="text-red-500 hover:text-red-700 cursor-pointer"
                aria-label="Remove item"
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-6">
        <div className="w-full sm:max-w-md sm:ml-auto">
          <div className="flex justify-between mb-2">
            <span className="text-base md:text-lg font-semibold">Total</span>
            <span className="text-lg md:text-xl font-bold">{total.toFixed(2)} MAD</span>
          </div>
          <button 
            className={`w-full py-2 md:py-3 rounded transition text-sm md:text-base ${
              isCheckingOut 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-500 text-white hover:bg-red-700'
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