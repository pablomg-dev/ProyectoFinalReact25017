import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { useState } from 'react';


function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // La función handleLogin se ejecuta al enviar el formulario
    const handleLogin = (e) => {
        e.preventDefault();

        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('auth', 'true');
            navigate('/admin');
        } else {
            alert('Credenciales incorrectas. Intenta con "admin" y "admin123"');
            setUsername('');
            setPassword('');
        }
    };

    return (
        <Container
            className="mt-5 d-flex flex-column justify-content-center align-items-center"
            style={{ maxWidth: 400, minHeight: '80vh' }}
        >
            <h2 className="mb-4">Login</h2>
            <Form onSubmit={handleLogin} className="w-100">
                <Form.Group className="mb-3">
                    <Form.Label>User</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
