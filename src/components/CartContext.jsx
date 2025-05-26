import { createContext, useState, useContext, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Intentar obtener el carrito del localStorage al inicio
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Guardar el carrito en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Agregar un producto al carrito
    const addToCart = (product) => {
        setCartItems(prevItems => {
            // Verificar si el producto ya existe
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems; // Si ya existe, no lo agregamos de nuevo
            }
            // Si es un nuevo producto, lo agregamos
            return [...prevItems, product];
        });
    };

    // Obtener la cantidad total de items en el carrito
    const getCartItemsCount = () => {
        return cartItems.length;
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            getCartItemsCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook personalizado para usar el contexto del carrito
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
