import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';


function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Estado para el mensaje de error

    // La función handleLogin se ejecuta al enviar el formulario
    const handleLogin = (e) => {
        e.preventDefault();

        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('auth', 'true');
            setError('');
            // Redirigir a la ruta previa si existe, si no a /admin
            const from = location.state?.from || '/admin';
            navigate(from);
        } else {
            setError('Incorrect credentials. Try "admin" and "admin123".');
            setUsername('');
            setPassword('');
        }
    };

    return (
        <Container
            className="mt-5 d-flex flex-column justify-content-center align-items-center"
            style={{ maxWidth: 400 }}
        >
            <h2 className="mb-4">Login</h2>
            {/* Mostrar alerta si hay error */}
            {error && (
                <Alert variant="danger" className="w-100">
                    {error}
                </Alert>
            )}
            <Form onSubmit={handleLogin} className="w-100">
                <Form.Group className="mb-3">
                    <Form.Label>User</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                    Enter
                </Button>
            </Form>
        </Container>
    );
};

export default Login;
