import { Container, Card } from 'react-bootstrap';

function Admin() {
    return (
        <Container className="mt-4">
            <h2 className="mb-4">Admin Panel</h2>
            <Card>
                <Card.Body>
                    <Card.Title>Welcome, Admin</Card.Title>
                    <Card.Text>
                        You have access to:
                        <ul className="mt-2">
                            <li>View and manage your cart</li>
                            <li>Access exclusive content</li>
                            <li>View your profile information</li>
                        </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Admin;
