import React, { useEffect, useState } from 'react';
import { CheckCircle, X, ShoppingBag, Sparkles } from 'lucide-react';
import CLink from './CLink';

export default function CheckoutMessage({ onDismiss, orderCode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
      <div 
        className={`
          relative w-full max-w-md transform transition-all duration-500 ease-out
          ${isExiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
        `}
      >
        {/* Main Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-8 shadow-2xl border border-green-200">
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-200/30 rounded-full blur-2xl animate-pulse delay-700"></div>
          
          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-green-100 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-green-700" />
          </button>

          {/* Success Icon with Animation */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              {/* Outer pulse ring */}
              <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
              
              {/* Icon container */}
              <div className="relative bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-4 shadow-lg transform hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
              </div>
              
              {/* Sparkle effects */}
              <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-3 relative z-10">
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                Commande envoyée !
            </h3>

            <p className="text-gray-600 leading-relaxed">
                Votre commande a été envoyée. Nous vous contacterons bientôt au
                <CLink className="font-bold" href="tel:+212661547900">+212 661 54 79 00</CLink>.
            </p>


            {/* Order Details */}
            <div className="mt-6 p-2 px-3 bg-white/60 backdrop-blur rounded-xl border border-green-100 shadow-sm">
              <div className="flex items-center justify-between gap-1 text-md text-gray-700">
                <span className='flex gap-2'>
                    <ShoppingBag className="w-5 h-5 text-green-600" />
                <span className="font-medium">Numéro de commande:</span>
                </span>
                <span className="font-mono text-green-700">#{orderCode || ""}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <CLink
                onClick={handleDismiss}
                href={`/shop`}
                className="flex-1 px-4 py-2 bg-white text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 border border-gray-200 shadow-sm hover:shadow"
              >
                Continuer mes achats
              </CLink>
              <CLink
              href={`/profile`}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Voir ma commande
              </CLink>
            </div>
          </div>

          {/* Decorative bottom wave */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400"></div>
        </div>
      </div>
    </div>
  );
}