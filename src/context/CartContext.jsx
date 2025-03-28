'use client'

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);


export default function CartProvider({ children }) {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const sevedCart = localStorage.getItem('cart')
        if (sevedCart) {
            try {
                setCart(JSON.parse(sevedCart))
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
            // Check if item already exists
            const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);

            if (existingItemIndex > -1) {
                // If item exists, update quantity
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += item.quantity;
                return updatedCart;
            }

            // If item is new, add to cart
            return [...prevCart, item];
        });
    };

    // Remove item from cart
    const removeFromCart = (itemId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    };

    // Update item quantity
    const updateQuantity = (itemId, quantity) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === itemId
                    ? { ...item, quantity: Math.max(1, quantity) }
                    : item
            )
        );
    };

    // Clear entire cart
    const clearCart = () => {
        setCart([]);
    };



    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}



export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error('useCart must be used within a CartProvider');
    }

    return context;
};