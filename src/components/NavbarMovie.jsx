import { Navbar, Container, Nav } from "react-bootstrap";
import {  Link } from 'react-router-dom';

const NavigationBar = ({warna}) => {
  return (
    <div>
      <Navbar variant={warna}>
        <Container>
          <Navbar.Brand as={Link} to="/">
            OSYFILM
          </Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
