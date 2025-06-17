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
                // Si existe, incrementamos la cantidad
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            }
            // Si es nuevo, lo agregamos con cantidad 1
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };
    // Eliminar un producto del carrito
    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };
    // Actualizar la cantidad de un producto en el carrito
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };
    // Calcula el número total de artículos en el carrito
    const getCartItemsCount = () => {
        return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    };

    // Calcula el total del carrito multiplicando precio por cantidad
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => 
            total + (item.price * (item.quantity || 1)), 0
        );
    };
    
    // Proporciona el contexto del carrito a los componentes hijos
    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            getCartItemsCount,
            getCartTotal
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
