import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">Gestion de Patrimoine</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/">Accueil</Nav.Link>
                    <Nav.Link as={Link} to="/possessions">Liste des Possessions</Nav.Link>
                    <Nav.Link as={Link} to="/possessions/create">Créer une Possession</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;
