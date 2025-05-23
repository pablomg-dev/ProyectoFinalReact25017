import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();
    const isAuth = localStorage.getItem('auth') === 'true';

    const logOut = () => {
        localStorage.removeItem('auth');
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="md">
            <Container>
                <Navbar.Brand as={Link} to="/">SuperSuerteStore</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/electronics">Electronics</Nav.Link>
                        <Nav.Link as={Link} to="/jewelry">Jewelry</Nav.Link>
                    </Nav>

                    <Nav className="ms-auto">
                        {isAuth && (
                            <Button variant="outline-info" as={Link} to="/admin" className="me-2">
                                Admin
                            </Button>
                        )}

                        {!isAuth ? (
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        ) : (
                            <Button variant="outline-light" onClick={logOut}>Logout</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
