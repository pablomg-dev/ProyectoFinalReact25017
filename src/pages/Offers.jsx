import { Container, ListGroup } from 'react-bootstrap';


function Offers() {
    return (
        <Container className="mt-4">
            <h2>Offers</h2>
            <ListGroup>
                <ListGroup.Item>Product A</ListGroup.Item>
                <ListGroup.Item>Product B</ListGroup.Item>
                <ListGroup.Item>Product C</ListGroup.Item>
            </ListGroup>
        </Container>
    );
};

export default Offers;
