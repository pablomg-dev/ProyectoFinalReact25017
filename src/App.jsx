import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
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
    // Envuelve la aplicación en CartProvider para proveer el contexto del carrito
    <CartProvider>
      {/* Usa BrowserRouter para habilitar el enrutamiento en la aplicación */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/jewelry" element={<Jewelry />} />
          <Route path="/cart" element={
            // Usa ProtectedRoute para asegurar que solo usuarios autenticados accedan al carrito
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
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
