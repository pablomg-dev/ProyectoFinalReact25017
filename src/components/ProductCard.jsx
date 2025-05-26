import { Card, Button } from 'react-bootstrap';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

// Recibe 'product' como prop
const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    // Función para manejar el clic en "Add to Cart"
    const handleAddToCart = () => {
        const isAuth = localStorage.getItem('auth') === 'true';
        
        if (!isAuth) {
            alert('You must be logged in to add products to your cart.');
            navigate('/login');
            return;
        }

        addToCart(product);
        alert(`"${product.title}" has been added to the cart.`);
    };

    return (
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
                <Button variant="success" onClick={handleAddToCart} className="mt-auto"> {/* mt-auto para pegarlo al final */}
                    Add to Cart
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
