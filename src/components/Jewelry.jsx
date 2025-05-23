import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Jewelry() {
    const [jewelry, setJewelry] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJewelry = async () => {
            try {
                setLoading(true);

                const response = await fetch('https://fakestoreapi.com/products/category/jewelery');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setJewelry(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJewelry();
    }, []);

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">Exquisite Jewelry Collection</h1>
            <p className="text-center mb-5">Adorn yourself with our stunning rings, necklaces, and more.</p>

            {loading && (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Cargando joyería...</span>
                    </Spinner>
                </div>
            )}

            {error && (
                <Alert variant="danger" className="text-center">
                    Error al cargar productos de joyería: {error}
                </Alert>
            )}

            {!loading && !error && (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {jewelry.map(product => (
                        <Col key={product.id}>
                            <Card className="h-100 shadow-sm">
                                <Card.Img
                                    variant="top"
                                    src={product.image}
                                    style={{ height: '200px', objectFit: 'contain', padding: '10px' }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="text-truncate" title={product.title}>{product.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">${product.price}</Card.Subtitle>
                                    <Card.Text className="flex-grow-1">
                                        {product.description.length > 100
                                            ? product.description.substring(0, 100) + '...'
                                            : product.description}
                                    </Card.Text>
                                    <Button variant="primary" className="mt-auto" as={Link} to={`/products/${product.id}`}>View Details</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default Jewelry;
