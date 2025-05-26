// src/components/Home.jsx
import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ProductCard from './ProductCard';

function Home() {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener el estado de autenticación del localStorage
    const isAuth = localStorage.getItem('auth') === 'true';

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
                        <span className="visually-hidden">Loading products...</span>
                    </Spinner>
                </div>
            )}

            {error && (
                <Alert variant="danger" className="text-center">
                    Error to load products: {error}
                </Alert>
            )}

            {!loading && !error && (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {allProducts.map(product => (
                        <Col key={product.id} className="d-flex">
                            <ProductCard product={product} isAuth={isAuth} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default Home;
