import { Container } from 'react-bootstrap';
import { Facebook, Instagram } from 'react-bootstrap-icons';

function Footer() {
    return (
        // Componente Footer que muestra información de contacto y enlaces a redes sociales
        <footer className="bg-dark text-white mt-5 py-3">
            <Container className="d-flex justify-content-between align-items-center">
                <p className="mb-0">SuperSuerteStore &copy; 2025</p>
                <div className="social-icons">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                        <Facebook size="1.5rem" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
                        <Instagram size="1.5rem" />
                    </a>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
