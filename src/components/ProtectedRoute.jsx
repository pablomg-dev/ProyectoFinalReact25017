import { Navigate } from 'react-router-dom'; // Se importa el componente Navigate para poder redirigir al usuario a otra ruta

// Se crea el componente ProtectedRoute que recibe un children como prop
function ProtectedRoute({ children }) {
    const auth = localStorage.getItem('auth') === 'true'; // Se verifica si el usuario está autenticado
    return auth ? children : <Navigate to="/login" />; // Si el usuario está autenticado, se muestra el children, si no, se redirige a la ruta de login
};

export default ProtectedRoute;
