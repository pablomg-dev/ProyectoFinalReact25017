import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { useCart } from './CartContext';

const Cart = () => {
    const { cartItems } = useCart();

    if (cartItems.length === 0) {
        return (
            <Container className="mt-4 text-center">
                <h2>Your cart is empty</h2>
                <p>Add some products to start!</p>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Your Cart</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
                {cartItems.map(item => (
                    <Col key={item.id}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body>
                                <div className="d-flex align-items-center mb-3">
                                    <Image 
                                        src={item.image} 
                                        alt={item.title} 
                                        style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                                        className="me-3"
                                    />
                                    <div>
                                        <Card.Title className="mb-1">{item.title}</Card.Title>
                                        <Card.Text className="text-muted">
                                            ${item.price}
                                        </Card.Text>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Cart;
