import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ProductCard from './ProductCard';


function Jewelry({ isAuth, addToCart }) {
    // Estados para productos, carga y error
    const [jewelry, setJewelry] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener productos de joyería al montar el componente
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

    // Renderizar productos, carga o error
    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">Exquisite Jewelry Collection</h1>
            <p className="text-center mb-5">Adorn yourself with our stunning and elegant pieces.</p>

            {loading && (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading jewelry...</span>
                    </Spinner>
                </div>
            )}

            {error && (
                <Alert variant="danger" className="text-center">
                    Error loading jewelry products: {error}
                </Alert>
            )}

            {!loading && !error && (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {jewelry.map(product => (
                        <Col key={product.id}>
                            <ProductCard product={product} isAuth={isAuth} addToCart={addToCart} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default Jewelry;
