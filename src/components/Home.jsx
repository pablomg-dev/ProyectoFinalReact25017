import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Form, Button, InputGroup } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import ProductCard from './ProductCard';

function Home() {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

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
                setFilteredProducts(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    // Maneja la búsqueda
    const handleSearch = (e) => {
        e.preventDefault();
        if (!search.trim()) {
            setFilteredProducts(allProducts);
        } else {
            setFilteredProducts(
                allProducts.filter(product =>
                    product.title.toLowerCase().includes(search.toLowerCase())
                )
            );
        }
    };

    useEffect(() => {
        // Si el campo de búsqueda queda vacío, mostrar todos los productos
        if (search.trim() === '') {
            setFilteredProducts(allProducts);
        }
    }, [search, allProducts]);

    return (
        <Container className="mt-4">
            <Helmet>
                <title>SuperSuerteStore | Home</title>
                <meta name="description" content="Find the best offers on electronics, clothing, jewelry and more at SuperSuerteStore." />
            </Helmet>
            <h1 className="text-center mb-4">Welcome to SuperSuerteStore</h1>
            <p className="text-center mb-5">Where you can find the best offers if you're lucky...</p>

            <h2 className="mb-4 text-center">All Our Products</h2>

            {/* Buscador */}
            <Form onSubmit={handleSearch} className="mb-4">
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <Button variant="primary" type="submit">
                        Search
                    </Button>
                </InputGroup>
            </Form>

            {/* Mostrar spinner de carga, mensaje de error o productos */}
            {loading && (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading products...</span>
                    </Spinner>
                </div>
            )}
            {/* Mostrar mensaje de error si ocurre */}
            {error && (
                <Alert variant="danger" className="text-center">
                    Error to load products: {error}
                </Alert>
            )}
            {/* Mostrar productos filtrados si no hay errores ni carga */}
            {!loading && !error && (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {filteredProducts.map(product => (
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
