import { Container, Table, Button, ButtonGroup, Modal, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Si el usuario no está autenticado, redirigir a login
        const isAuth = localStorage.getItem('auth') === 'true';
        if (!isAuth) {
            navigate('/login', { state: { from: '/cart' } });
        } else {
            // Mostrar spinner de carga breve al volver del login
            setLoading(true);
            const timer = setTimeout(() => setLoading(false), 700);
            return () => clearTimeout(timer);
        }
    }, [navigate]);

    // Mostrar spinner de carga si loading es true
    if (loading) {
        return (
            <Container className="mt-5 d-flex flex-column align-items-center justify-content-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading cart...</span>
                </Spinner>
                <p className="mt-3">Loading your cart...</p>
            </Container>
        );
    }

    const handleRemoveClick = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const confirmRemove = () => {
        if (selectedItem) {
            removeFromCart(selectedItem.id);
            toast.info(`"${selectedItem.title}" removed from cart.`);
        }
        setShowModal(false);
        setSelectedItem(null);
    };

    // Si el carrito está vacío, se muestra un mensaje
    if (cartItems.length === 0) {
        return (
            <Container className="mt-4 text-center">
                <h2>Your cart is empty</h2>
                <p>Add some products to start shopping!</p>
            </Container>
        );
    }

    // Si el carrito no está vacío, se muestra el carrito
    return (
        <>
        <Container className="mt-4">
            <h2 className="mb-4">Shopping Cart</h2>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => (
                        // Se muestra cada producto del carrito
                        <tr key={item.id}>
                            <td>
                                <div className="d-flex align-items-center">
                                    <img 
                                        src={item.image} 
                                        alt={item.title}
                                        style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                                        className="me-3"
                                    />
                                    <span>{item.title}</span>
                                </div>
                            </td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>
                                <ButtonGroup size="sm">
                                    <Button 
                                        variant="outline-secondary"
                                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                                    >
                                        -
                                    </Button>
                                    <Button variant="outline-secondary" disabled>
                                        {item.quantity || 1}
                                    </Button>
                                    <Button 
                                        variant="outline-secondary"
                                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                    >
                                        +
                                    </Button>
                                </ButtonGroup>
                            </td>
                            <td>${((item.quantity || 1) * item.price).toFixed(2)}</td>
                            <td>
                                <Button 
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleRemoveClick(item)}
                                >
                                    Remove
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3" className="text-end">
                            <strong>Total:</strong>
                        </td>
                        <td colSpan="2">
                            <strong>${getCartTotal().toFixed(2)}</strong>
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </Container>
        {/* Modal de confirmación para eliminar del carrito */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Remove Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedItem && (
                    <>
                        Are you sure you want to remove <strong>{selectedItem.title}</strong> from your shopping cart?
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={confirmRemove}>
                    Remove
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
};

export default Cart;
