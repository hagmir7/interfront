'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  countItemsInCart: () => 0
});

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Add more detailed logging
        const savedCart = localStorage.getItem('cart')
        console.log('Saved cart from localStorage:', savedCart);
        
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                console.log('Parsed cart:', parsedCart);
                setCart(parsedCart);
            } catch (error) {
                console.error('Error parsing cart from localStorage:', error);
            }
        }
    }, [])

    useEffect(() => {
        // Log cart changes
        console.log('Cart updated:', cart);
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        console.log('Adding item to cart:', item);
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);

            if (existingItemIndex > -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += item.quantity;
                return updatedCart;
            }

            return [...prevCart, item];
        });
    };

    const removeFromCart = (itemId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId, quantity) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === itemId
                    ? { ...item, quantity: Math.max(1, quantity) }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    // const countItemsInCart = useCallback(() => {
    //     const itemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    //     console.log('Current cart item count:', itemCount.length);
    //     return itemCount;
    // }, [cart]);

    const countItemsInCart = ()=>{
        return 100;
    }
    
    return (
        <CartContext.Provider 
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                countItemsInCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        console.error('useCart must be used within a CartProvider');
        return {
          cart: [],
          addToCart: () => {},
          removeFromCart: () => {},
          updateQuantity: () => {},
          clearCart: () => {},
          countItemsInCart: () => 0
        };
    }

    return context;
}