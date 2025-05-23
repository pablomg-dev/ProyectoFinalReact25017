import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';


function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
        localStorage.setItem('auth', 'true');
        navigate('/perfil/usuario123');
    };

    return (
        <Container className="mt-5" style={{ maxWidth: 400 }}>
            <h2>Login</h2>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>User</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>
                <Button variant="primary" onClick={handleLogin}>Enter</Button>
            </Form>
        </Container>
    );
};

export default Login;
