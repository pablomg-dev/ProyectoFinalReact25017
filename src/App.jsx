import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
// import Menu from "./components/Menu";
import ProtectedRoute from './components/ProtectedRoute';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Offer from "./pages/Offer";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";



function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/offer" element={<Offer />} />

          <Route path="/profile/:id" element={
            <ProtectedRoute>
              <Profile />
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
    </>
  );
}

export default App;
