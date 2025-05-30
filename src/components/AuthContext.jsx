import { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Al iniciar, verifica si hay un token en localStorage
    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            setUser({ username: 'admin', token });
        }
    }, []);

    // Simula login y guarda un token aleatorio
    const login = (username, password) => {
        if (username === 'admin' && password === 'admin123') {
            const token = Math.random().toString(36).substring(2);
            localStorage.setItem('auth_token', token);
            setUser({ username, token });
            return true;
        }
        return false;
    };

    // Logout: borra el token y el usuario
    const logout = () => {
        localStorage.removeItem('auth_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook para usar el contexto
export function useAuth() {
    return useContext(AuthContext);
}