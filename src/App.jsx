import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import { AuthProvider} from './components/AuthContext';
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Electronics from "./components/Electronics";
import Jewelry from "./components/Jewelry";
import ProtectedRoute from './components/ProtectedRoute';
import Login from "./components/Login";
import Admin from "./components/Admin";
import Cart from "./components/Cart";

function App() {

  return (
    // Envuelve la aplicación con AuthProvider y CartProvider para manejar autenticación y carrito de compras
    <AuthProvider>
      <CartProvider>
        <div className="d-flex flex-column min-vh-100">
          {/* Usa BrowserRouter para habilitar el enrutamiento en la aplicación */}
          <BrowserRouter>
            <Header />
            <div className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/electronics" element={<Electronics />} />
                <Route path="/jewelry" element={<Jewelry />} />
                <Route path="/cart" element={
                  // ProtectedRoute asegura que solo usuarios autenticados accedan al carrito
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } />
              </Routes>
            </div>
            <Footer />
          </BrowserRouter>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
