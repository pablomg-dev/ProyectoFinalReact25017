import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate

// Recibe 'product' y 'isAuth' como props
const ProductCard = ({ product, isAuth }) => {
    const navigate = useNavigate(); // Inicializa useNavigate para la redirección

    // Función para manejar el clic en "Add to Cart"
    const handleAddToCart = () => {
        if (!isAuth) {
            // Si el usuario NO está logueado, redirigir al login
            alert('Debes iniciar sesión para agregar productos al carrito.');
            navigate('/login'); // Redirige al usuario a la página de login
        } else {
            // Si el usuario SÍ está logueado, proceder con la lógica de agregar al carrito
            console.log(`Producto "${product.title}" (ID: ${product.id}) agregado al carrito!`);
            alert(`"${product.title}" ha sido añadido al carrito.`);
            // Aquí puedes añadir la lógica real para agregar al carrito,
            // como actualizar un estado global o enviar una petición a una API.
        }
    };

    return (
        <Card className="h-100 shadow-sm"> {/* h-100 para que todas las tarjetas tengan la misma altura */}
            <Card.Img
                variant="top"
                src={product.image}
                style={{ height: '200px', objectFit: 'contain', padding: '10px' }}
            />
            <Card.Body className="d-flex flex-column"> {/* flex-column para que el botón quede abajo */}
                {/* Usamos text-truncate y title para títulos largos */}
                <Card.Title className="text-truncate" title={product.title}>
                    {product.title}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    ${product.price}
                </Card.Subtitle>
                <Card.Text className="flex-grow-1"> {/* flex-grow-1 para que ocupe el espacio restante */}
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