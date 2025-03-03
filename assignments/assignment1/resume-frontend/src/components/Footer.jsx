import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <Container className="text-center">
        <p className="mb-0">{new Date().getFullYear()} My Online Resume.</p>
      </Container>
    </footer>
  );
}

export default Footer;