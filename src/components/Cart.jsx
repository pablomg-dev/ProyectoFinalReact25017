import { Container, Table, Button, ButtonGroup } from 'react-bootstrap';
import { useCart } from './CartContext';

const Cart = () => {
    // Se obtiene el carrito de compras
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

    // Si el carrito está vacío, se muestra un mensaje
    if (cartItems.length === 0) {
        return (
            <Container className="mt-4 text-center">
                <h2>Your cart is empty</h2>
                <p>Add some products to start!</p>
            </Container>
        );
    }

    // Si el carrito no está vacío, se muestra el carrito
    return (
        <Container className="mt-4">
            <h2 className="mb-4">Your Cart</h2>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
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
                                    onClick={() => removeFromCart(item.id)}
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
                            <strong>Cart Total:</strong>
                        </td>
                        <td colSpan="2">
                            <strong>${getCartTotal().toFixed(2)}</strong>
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </Container>
    );
};

export default Cart;
