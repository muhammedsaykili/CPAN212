import { Navbar, Container } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">My Online Resume</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;