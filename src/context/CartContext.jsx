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

        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                setCart(parsedCart);
            } catch (error) {
                console.error('Error parsing cart from localStorage:', error);
            }
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
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

    const countItemsInCart = ()=>{
        return cart.length || 0;
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
          countItemsInCart: () => 0,
        };
    }

    return context;
}