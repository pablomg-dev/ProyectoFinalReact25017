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

    const API_URL = 'https://6851d5c78612b47a2c0b6129.mockapi.io/api/v1/products';

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await fetch(API_URL);
                if (!response.ok) throw new Error('Error loading products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            setSubmitStatus({
                type: 'danger',
                message: 'Error loading products: ' + error.message
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length < 3 || formData.name.length > 50) {
            newErrors.name = 'Name must be between 3 and 50 characters';
        }

        if (!formData.price) {
            newErrors.price = 'Price is required';
        } else if (isNaN(formData.price) || Number(formData.price) < 0) {
            newErrors.price = 'Price must be a number greater than or equal to 0';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.length < 10) {
            newErrors.description = 'Description must be at least 10 characters';
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
                ? `${API_URL}/${formData.id}`
                : API_URL;

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
                throw new Error('Error ' + (editMode ? 'editing' : 'creating') + ' the product');
            }

            setSubmitStatus({
                type: 'success',
                message: 'Product ' + (editMode ? 'updated' : 'added') + ' successfully!'
            });
            setFormData({ name: '', price: '', description: '' });
            setEditMode(false);
            loadProducts();
        } catch (error) {
            setSubmitStatus({
                type: 'danger',
                message: 'Error connecting to the server: ' + error.message
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

            if (!response.ok) throw new Error('Error deleting the product');

            await loadProducts();
            setSubmitStatus({
                type: 'success',
                message: 'Product deleted successfully'
            });
        } catch (error) {
            setSubmitStatus({
                type: 'danger',
                message: 'Error deleting the product: ' + error.message
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
            <h2 className="mb-4">Admin Panel</h2>
            
            {submitStatus.message && (
                <Alert variant={submitStatus.type} className="mb-4">
                    {submitStatus.message}
                </Alert>
            )}

            <Card className="mb-4">
                <Card.Body>
                    <Card.Title className="mb-4">Add / Edit Product</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
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
                            <Form.Label>Price</Form.Label>
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
                            <Form.Label>Description</Form.Label>
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
                        <div className="d-flex gap-2">
                            <Button 
                                variant="primary" 
                                type="submit" 
                                disabled={isLoading}
                            >
                                {isLoading ? 'Saving...' : (editMode ? 'Update Product' : 'Add Product')}
                            </Button>
                            <Button 
                                variant="secondary" 
                                type="button"
                                onClick={resetForm}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            <Card>
                <Card.Body>
                    <Card.Title>Products</Card.Title>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Actions</th>
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
                                            Edit
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            size="sm" 
                                            onClick={() => handleDelete(product)}
                                        >
                                            Delete
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
                    <Modal.Title>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProduct && (
                        <>Are you sure you want to delete <strong>{selectedProduct.name}</strong>? This action cannot be undone.</>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Admin;
