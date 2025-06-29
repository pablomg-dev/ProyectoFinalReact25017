import { Card } from 'react-bootstrap';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

// Styled button usando styled-components (fuera del componente)
const StyledButton = styled.button`
  background-color: #28a745;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: auto;
  transition: background 0.2s;
  &:hover {
    background-color: #218838;
  }
`;

// Recibe 'product' como prop
const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    // Función para manejar el clic en "Add to Cart"
    const handleAddToCart = () => {
        const isAuth = localStorage.getItem('auth') === 'true';
        if (!isAuth) {
            toast.error('You must be logged in to add products to your cart.');
            navigate('/login', { state: { from: window.location.pathname } });
            return;
        }
        addToCart(product);
        toast.success(`"${product.title}" added to cart!`);
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

                {/* Botón "Add to Cart" usando styled-components */}
                <StyledButton onClick={handleAddToCart}>
                    Add to Cart
                </StyledButton>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
