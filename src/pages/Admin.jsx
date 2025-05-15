import { Container } from 'react-bootstrap';

export default function Admin() {
    return (
        <Container className="mt-4">
            <h2>Panel de Administración</h2>
            <p>Acceso exclusivo para usuarios autenticados.</p>
        </Container>
    );
}