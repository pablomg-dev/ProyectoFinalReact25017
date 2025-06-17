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
                    </Card.Text>
                    <ul className="mt-2">
                        <li>View and manage your cart</li>
                        <li>View your profile information</li>
                        <li>Add products to the inventory</li>
                    </ul>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Admin;
