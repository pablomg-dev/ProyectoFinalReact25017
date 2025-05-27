import { Navigate } from 'react-router-dom'; // Se importa el componente Navigate para poder redirigir al usuario a otra ruta

// Componente ProtectedRoute que recibe un children como prop
function ProtectedRoute({ children }) {
    const auth = localStorage.getItem('auth') === 'true'; // Verifica si el usuario está autenticado
    return auth ? children : <Navigate to="/login" />; // Si está autenticado, se muestra el children, si no, se redirige a la ruta de login
};

export default ProtectedRoute;
