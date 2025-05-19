import { Navigate } from 'react-router-dom';


function ProtectedRoute({ children }) {
    const auth = localStorage.getItem('auth') === 'true';
    return auth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
