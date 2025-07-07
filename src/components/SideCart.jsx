'use client'
import React, { useState } from 'react';
import { X, Minus, Plus, Ship, ShoppingCart } from 'lucide-react';

const ShoppingCartSidebar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('shoppingcart');
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Sophisticated Swagger Suit',
      price: 50.00,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Cozy Knit Cardigan Sweater',
      price: 40.00,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=80&h=80&fit=crop'
    },
    {
      id: 3,
      name: 'Athletic Mesh Sports Leggings',
      price: 65.00,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1506629905607-67d88c4a9b71?w=80&h=80&fit=crop'
    }
  ]);

  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Sophisticated Swagger Suit',
      price: 50.00,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Cozy Knit Cardigan Sweater',
      price: 40.00,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=80&h=80&fit=crop'
    }
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeCartItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const removeWishlistItem = (id) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const progressPercentage = Math.min((subtotal / 200) * 100, 100);

  return (
    <>
      {/* Open Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed top-6 right-6 z-40 bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors"
      >
        <ShoppingCart size={24} />
      </button>

      {/* Overlay and Sidebar */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-40 bg-opacity-50 flex justify-end"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="w-full max-w-md h-full bg-white shadow-2xl transition-transform duration-300 transform translate-x-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="w-10 h-10 flex items-center justify-center absolute top-6 right-5 opacity-50 hover:opacity-100 text-2xl transition-opacity"
            >
              <X size={24} />
            </button>

            {/* Scrollable Content */}
            <div className="flex-grow overflow-y-auto py-16 px-8">
              {/* Your existing cart content stays here */}
              {/* Keep your tab navigation, cart, wishlist, subtotal, etc. */}
              {/* Example: */}
              <ul className="flex flex-wrap justify-center border-b border-gray-300 mb-6">
                <li className="flex-1">
                  <button
                    className={`w-full py-3 px-5 text-center font-medium border-b-2 transition-colors ${activeTab === 'shoppingcart' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
                    onClick={() => setActiveTab('shoppingcart')}
                  >
                    Shopping Cart
                    <span className={`text-xs inline-flex items-center justify-center w-6 h-6 font-bold rounded-full ml-2 ${activeTab === 'shoppingcart' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                      {cartItems.length}
                    </span>
                  </button>
                </li>
                <li className="flex-1">
                  <button
                    className={`w-full py-3 px-5 text-center font-medium border-b-2 transition-colors ${activeTab === 'wishlist' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
                    onClick={() => setActiveTab('wishlist')}
                  >
                    Wishlist
                    <span className={`text-xs inline-flex items-center justify-center w-6 h-6 font-bold rounded-full ml-2 ${activeTab === 'wishlist' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                      {wishlistItems.length}
                    </span>
                  </button>
                </li>
              </ul>

               {/* Shopping Cart Tab */}
          {activeTab === 'shoppingcart' && (
            <div className="flex flex-col min-h-[calc(100vh-300px)]">
              <ul className="space-y-4 flex-grow">
                {cartItems.map((item) => (
                  <li key={item.id} className="py-5 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="w-20 h-20 rounded-3xl overflow-hidden mr-4 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 mr-4">
                        <h6 className="mb-2 font-medium text-sm">
                          <a href="#" className="hover:text-red-600 transition-colors">
                            {item.name}
                          </a>
                        </h6>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 rounded-full border border-red-600 bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
                            >
                              <Minus size={16} />
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(value) => updateQuantity(value)}
                              readOnly
                              className="w-8 h-8 text-center border border-red-600 rounded-full mx-2 bg-gray-50 outline-none text-sm"
                            />
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 rounded-full border border-red-600 bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <h6 className="font-medium ml-4">MAD{item.price.toFixed(2)}</h6>
                        </div>
                      </div>
                      <button
                        onClick={() => removeCartItem(item.id)}
                        className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Subtotal */}
              <div className="flex items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg">
                <h5 className="font-bold">Subtotal:</h5>
                <h5 className="font-bold">MAD{subtotal.toFixed(2)}</h5>
              </div>

    

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full py-3 px-6 text-base font-medium border border-red-600 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-colors duration-300">
                  Checkout
                </button>
                <button className="w-full py-3 px-6 text-base font-medium border border-red-600 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-300">
                  View Cart
                </button>
              </div>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="flex flex-col min-h-[calc(100vh-300px)]">
              <ul className="space-y-4 flex-grow">
                {wishlistItems.map((item) => (
                  <li key={item.id} className="py-5 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="w-20 h-20 rounded-3xl overflow-hidden mr-4 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 mr-4">
                        <h6 className="mb-2 font-medium text-sm">
                          <a href="#" className="hover:text-red-600 transition-colors">
                            {item.name}
                          </a>
                        </h6>
                        <div className="flex items-center">
                          <h6 className="font-medium">MAD{item.price.toFixed(2)}</h6>
                        </div>
                      </div>
                      <button
                        onClick={() => removeWishlistItem(item.id)}
                        className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Wishlist Action Button */}
              <div className="mt-auto">
                <button className="w-full py-3 px-6 text-base font-medium border border-red-600 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-300">
                  Check Your Favourite
                </button>
              </div>
            </div>
          )}

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingCartSidebar;
