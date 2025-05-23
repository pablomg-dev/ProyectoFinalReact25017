import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Electronics from "./components/Electronics";
import Jewelry from "./components/Jewelry";
import ProtectedRoute from './components/ProtectedRoute';
import Login from "./components/Login";
import Profile from "./components/Profile";
import Admin from "./components/Admin";



function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/jewelry" element={<Jewelry />} />

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
