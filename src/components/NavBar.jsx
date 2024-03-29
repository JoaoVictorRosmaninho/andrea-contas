import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import './css/client-component.css'

function MyNavBar() {
  return (
  <Row>
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand>DashBoard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <NavDropdown title="Gerenciar Logistas" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Logistas/new">Cadastrar Logistas</NavDropdown.Item>
              <NavDropdown.Item href="/Logistas">Listar Logistas</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Clientes" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Clientes/new">
                    Cadastrar Cliente
              </NavDropdown.Item>
              <NavDropdown.Item href="/Clientes" > 
                    Listar Cliente
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Contas" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Contas/new">Cadastrar Contas a Pagar</NavDropdown.Item>
              <NavDropdown.Item href="/Contas">Listar Contas</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Relatorios" id="basic-nav-dropdown">
              <NavDropdown.Item href="/relatorios/geral">Relatorio Geral</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    </Navbar.Collapse>
</Navbar>
  </Row>
  );
}

export default MyNavBar;