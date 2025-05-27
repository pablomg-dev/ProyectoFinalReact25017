import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ProductCard from './ProductCard'


function Electronics({ isAuth, addToCart }) {
    // useState para almacenar los productos electrónicos
    const [electronics, setElectronics] = useState([]);
    // useState para almacenar el estado de carga
    const [loading, setLoading] = useState(true);
    // useState para almacenar el error
    const [error, setError] = useState(null);

    // Se utiliza useEffect para obtener los productos electrónicos
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

    // Se devuelve el componente Electronics
    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">Discover Our Electronics</h1>
            <p className="text-center mb-5">From gadgets to gear, find the latest in technology.</p>
            {/* Se muestra un spinner mientras se carga el contenido */}
            {loading && (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading electronics...</span>
                    </Spinner>
                </div>
            )}
            {/* Se muestra un mensaje de error si ocurre un error al cargar los productos electrónicos */}
            {error && (
                <Alert variant="danger" className="text-center">
                    Error loading electronics products: {error}
                </Alert>
            )}

            {/* Se muestra el contenido si no hay un error y no está cargando */}
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