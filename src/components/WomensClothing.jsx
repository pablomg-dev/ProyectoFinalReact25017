import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ProductCard from './ProductCard';

function WomensClothing() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                // Usar encodeURIComponent para manejar el apóstrofe
                const category = encodeURIComponent("women's clothing");
                const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
                
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return (
        <Container className="text-center mt-5">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    );

    if (error) return (
        <Alert variant="danger" className="mt-3">
            Error: {error}
        </Alert>
    );

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Women's Clothing</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
                {products.map(product => (
                    <Col key={product.id}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default WomensClothing;
