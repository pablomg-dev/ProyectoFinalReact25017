import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                setLoading(true);
                
                const response = await fetch('https://fakestoreapi.com/products');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setAllProducts(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">Welcome to SuperSuerteStore</h1>
            <p className="text-center mb-5">Where you can find the best offers if you're lucky...</p>

            <h2 className="mb-4 text-center">All Our Products</h2>

            {loading && (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Cargando todos los productos...</span>
                    </Spinner>
                </div>
            )}

            {error && (
                <Alert variant="danger" className="text-center">
                    Error al cargar productos: {error}
                </Alert>
            )}

            {!loading && !error && (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {allProducts.map(product => (
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

export default Home;
