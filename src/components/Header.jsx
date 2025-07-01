import { useState } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CartFill } from 'react-bootstrap-icons';
import { useCart } from './CartContext';
import styled from 'styled-components';

const AdminButton = styled.button`
  background: none;
  color: #17a2b8;
  border: 1px solid #17a2b8;
  border-radius: 4px;
  padding: 6px 16px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  text-decoration: none;
  &:hover {
    background: #17a2b8;
    color: #fff;
    text-decoration: none;
  }
`;

const LogoutButton = styled.button`
  background: none;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 4px;
  padding: 6px 16px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  text-decoration: none;
  &:hover {
    background: #fff;
    color: #212529;
    text-decoration: none;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem('auth') === 'true';
  const { getCartItemsCount } = useCart();
  const [expanded, setExpanded] = useState(false);

  const logOut = () => {
    localStorage.removeItem('auth');
    navigate('/login');
    setExpanded(false);
  };

  const handleNavLinkClick = () => {
    setExpanded(false);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" expanded={expanded} onToggle={setExpanded} className="w-100">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="fs-3 fw-bold" onClick={handleNavLinkClick}>
          SuperSuerteStore
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-end flex-column flex-md-row flex-wrap align-items-end align-items-md-center gap-2">
            <Nav.Link as={Link} to="/" onClick={handleNavLinkClick} className="fs-5">Home</Nav.Link>
            <Nav.Link as={Link} to="/electronics" onClick={handleNavLinkClick} className="fs-5">Electronics</Nav.Link>
            <Nav.Link as={Link} to="/jewelry" onClick={handleNavLinkClick} className="fs-5">Jewelry</Nav.Link>
            <NavDropdown
              title="Clothes"
              id="clothes-dropdown"
              className="fs-5"
            >
              <NavDropdown.Item
                as={Link}
                to="/mens-clothing"
                onClick={handleNavLinkClick}
              >
                Men's Clothing
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/womens-clothing"
                onClick={handleNavLinkClick}
              >
                Women's Clothing
              </NavDropdown.Item>
            </NavDropdown>
            {isAuth ? (
              <>
                <Nav.Item className="d-grid mx-1">
                  <AdminButton
                    as={Link}
                    to="/admin"
                    className="my-2 my-md-0 d-inline-flex justify-content-center align-items-center"
                    onClick={handleNavLinkClick}
                  >
                    Admin
                  </AdminButton>
                </Nav.Item>
                <Nav.Item className="d-grid mx-1">
                  <LogoutButton
                    onClick={logOut}
                    className="my-2 my-md-0 d-inline-flex justify-content-center align-items-center"
                  >
                    Logout
                  </LogoutButton>
                </Nav.Item>
              </>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                onClick={handleNavLinkClick}
                className="me-md-2 my-2 my-md-0 d-inline-flex justify-content-center align-items-center fs-5"
              >
                Login
              </Nav.Link>
            )}
            <Nav.Link
              as={Link}
              to="/cart"
              onClick={handleNavLinkClick}
              className="my-2 my-md-0 d-inline-flex justify-content-center align-items-center position-relative"
              style={{ minWidth: 40, zIndex: 2 }}
            >
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <CartFill size={25} />
                {getCartItemsCount() > 0 && (
                  <span
                    style={{ position: 'absolute', top: -8, right: -8, zIndex: 3 }}
                    className="badge rounded-pill bg-danger"
                  >
                    {getCartItemsCount()}
                    <span className="visually-hidden">items in cart</span>
                  </span>
                )}
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
