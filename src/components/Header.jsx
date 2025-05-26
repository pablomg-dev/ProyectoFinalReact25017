import { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CartFill } from 'react-bootstrap-icons';

const Header = () => {
    const navigate = useNavigate();
    const isAuth = localStorage.getItem('auth') === 'true';

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
        <Navbar bg="dark" variant="dark" expand="md" expanded={expanded} onToggle={setExpanded}>
            <Container>
                <Navbar.Brand as={Link} to="/" className='fs-3 fw-bold' onClick={handleNavLinkClick}>
                    SuperSuerteStore
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto text-end flex-column flex-md-row align-items-end align-items-md-center">
                        <Nav.Link as={Link} to="/" onClick={handleNavLinkClick} className='me-md-2 fs-5'>Home</Nav.Link>
                        <Nav.Link as={Link} to="/electronics" onClick={handleNavLinkClick} className='me-md-2 fs-5'>Electronics</Nav.Link>
                        <Nav.Link as={Link} to="/jewelry" onClick={handleNavLinkClick} className='me-md-2 fs-5'>Jewelry</Nav.Link>

                        {/* Elementos de autenticación: Admin, Logout y Carrito (si logueado) o Login (si no logueado) */}
                        {isAuth ? (
                            <>
                                <Button
                                    variant="outline-info"
                                    as={Link}
                                    to="/admin"
                                    className="me-md-2 my-2 my-md-0 d-inline-flex justify-content-center align-items-center fs-5"
                                    onClick={handleNavLinkClick}
                                    size="sm"
                                >
                                    Admin
                                </Button>

                                <Button
                                    variant="outline-light"
                                    onClick={logOut}
                                    size="sm"
                                    className="me-md-2 my-2 my-md-0 d-inline-flex justify-content-center align-items-center fs-5"
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/login" onClick={handleNavLinkClick} className="me-md-2 my-2 my-md-0 d-inline-flex justify-content-center align-items-center fs-5">Login</Nav.Link>
                        )}

                        <Nav.Link
                            as={Link}
                            to="/cart"
                            onClick={handleNavLinkClick}
                            className="my-2 my-md-0 d-inline-flex justify-content-center align-items-center"
                        >
                            <CartFill size={25} />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
