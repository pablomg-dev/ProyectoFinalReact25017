import { Card, Button, Modal } from 'react-bootstrap';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Recibe 'product' como prop
const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '', action: null });

    // Función para manejar el clic en "Add to Cart"
    const handleAddToCart = () => {
        const isAuth = localStorage.getItem('auth') === 'true';
        
        if (!isAuth) {
            setModalContent({
                title: 'Login Required',
                message: 'You must be logged in to add products to your cart.',
                action: () => {
                    setShowModal(false);
                    navigate('/login');
                }
            });
            setShowModal(true);
            return;
        }
        // Llama a la función addToCart del contexto del carrito
        // y muestra un mensaje de confirmación
        addToCart(product);
        setModalContent({
            title: 'Added to Cart',
            message: `"${product.title}" has been added to the cart.`,
            action: () => setShowModal(false)
        });
        setShowModal(true);
    };

    return (
        <>
        <Card className="h-100 shadow-sm">
            <Card.Img
                variant="top"
                src={product.image}
                style={{ height: '200px', objectFit: 'contain', padding: '10px' }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="text-truncate" title={product.title}>
                    {product.title}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    ${product.price}
                </Card.Subtitle>
                <Card.Text className="flex-grow-1">
                    {product.description.length > 100
                        ? product.description.substring(0, 100) + '...'
                        : product.description}
                </Card.Text>

                {/* Botón "Add to Cart" siempre visible */}
                <Button variant="success" onClick={handleAddToCart} className="mt-auto">
                    Add to Cart
                </Button>
            </Card.Body>
        </Card>
        {/* Modal personalizado */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{modalContent.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalContent.message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                </Button>
                {modalContent.title === 'Login Required' && (
                    <Button variant="primary" onClick={modalContent.action}>
                        Go to Login
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default ProductCard;
