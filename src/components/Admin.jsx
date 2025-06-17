import { Container, Card, Form, Button, Alert, Table, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';


function Admin() {
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        price: '',
        description: ''
    });
    const [products, setProducts] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    const API_URL = 'https://6851d5c78612b47a2c0b6129.mockapi.io/products';

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Error al cargar productos');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            setSubmitStatus({
                type: 'danger',
                message: 'Error al cargar los productos: ' + error.message
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es obligatorio';
        } else if (formData.name.length < 3 || formData.name.length > 50) {
            newErrors.name = 'El nombre debe tener entre 3 y 50 caracteres';
        }

        if (!formData.price) {
            newErrors.price = 'El precio es obligatorio';
        } else if (isNaN(formData.price) || Number(formData.price) < 0) {
            newErrors.price = 'El precio debe ser un número mayor o igual a 0';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'La descripción es obligatoria';
        } else if (formData.description.length < 10) {
            newErrors.description = 'La descripción debe tener al menos 10 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsLoading(true);
        setSubmitStatus({ type: '', message: '' });

        try {
            const url = editMode 
                ? `${API_URL}/${formData.id}`  // URL para actualizar incluye el ID
                : API_URL;                      // URL para crear nuevo producto

            const response = await fetch(url, {
                method: editMode ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price)
                })
            });

            if (!response.ok) {
                throw new Error('Error al ' + (editMode ? 'editar' : 'crear') + ' el producto');
            }

            setSubmitStatus({
                type: 'success',
                message: '¡Producto ' + (editMode ? 'editado' : 'agregado') + ' exitosamente!'
            });
            setFormData({ name: '', price: '', description: '' });
            setEditMode(false);
            loadProducts();
        } catch (error) {
            setSubmitStatus({
                type: 'danger',
                message: 'Error al conectar con el servidor: ' + error.message
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleEdit = (product) => {
        setFormData({
            id: product.id,
            name: product.name,
            price: product.price.toString(),
            description: product.description
        });
        setEditMode(true);
    };

    const handleDelete = (product) => {
        setSelectedProduct(product);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`${API_URL}/${selectedProduct.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Error al eliminar el producto');

            await loadProducts();
            setSubmitStatus({
                type: 'success',
                message: 'Producto eliminado exitosamente'
            });
        } catch (error) {
            setSubmitStatus({
                type: 'danger',
                message: 'Error al eliminar el producto: ' + error.message
            });
        } finally {
            setShowDeleteModal(false);
            setSelectedProduct(null);
        }
    };

    const resetForm = () => {
        setFormData({
            id: null,
            name: '',
            price: '',
            description: ''
        });
        setEditMode(false);
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Panel de Administración</h2>
            
            {submitStatus.message && (
                <Alert variant={submitStatus.type} className="mb-4">
                    {submitStatus.message}
                </Alert>
            )}

            <Card className="mb-4">
                <Card.Body>
                    <Card.Title className="mb-4">Agregar / Editar Producto</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del producto</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                step="0.01"
                                isInvalid={!!errors.price}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.price}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                isInvalid={!!errors.description}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.description}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button 
                            variant="primary" 
                            type="submit" 
                            disabled={isLoading}
                        >
                            {isLoading ? 'Guardando...' : (editMode ? 'Actualizar Producto' : 'Agregar Producto')}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            <Card>
                <Card.Body>
                    <Card.Title>Productos</Card.Title>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price.toFixed(2)}</td>
                                    <td>{product.description}</td>
                                    <td>
                                        <Button 
                                            variant="warning" 
                                            size="sm" 
                                            onClick={() => handleEdit(product)}
                                            className="me-2"
                                        >
                                            Editar
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            size="sm" 
                                            onClick={() => handleDelete(product)}
                                        >
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar el producto <strong>{selectedProduct?.name}</strong>? Esta acción no se puede deshacer.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Admin;
