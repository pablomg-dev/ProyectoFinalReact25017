import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ProductCard from './ProductCard'


function Electronics({ isAuth, addToCart }) {
    const [electronics, setElectronics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchElectronics = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://fakestoreapi.com/products/category/electronics');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setElectronics(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchElectronics();
    }, []);

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">Discover Our Electronics</h1>
            <p className="text-center mb-5">From gadgets to gear, find the latest in technology.</p>

            {loading && (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading electronics...</span>
                    </Spinner>
                </div>
            )}

            {error && (
                <Alert variant="danger" className="text-center">
                    Error loading electronics products: {error}
                </Alert>
            )}

            {!loading && !error && (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {electronics.map(product => (
                        <Col key={product.id}>
                            <ProductCard product={product} isAuth={isAuth} addToCart={addToCart} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default Electronics;