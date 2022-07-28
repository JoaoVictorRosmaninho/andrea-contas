import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import './css/component.css'

function MyNavBar() {
  return (
  <Row>
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand>DashBoard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <NavDropdown title="Gerenciar Logistas" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Logistas/new">Cadastrar Logistas</NavDropdown.Item>
              <NavDropdown.Item href="/Logistas">Listar Logistas</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Clientes" id="basic-nav-dropdown">
              <NavDropdown.Item href="/transacaoCaixa/new">
                    Cadastrar Cliente
              </NavDropdown.Item>
              <NavDropdown.Item href="/transacaoCaixa" > 
                    Listar Cliente
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Contas" id="basic-nav-dropdown">
              <NavDropdown.Item href="/TransacaoAtivos/new">Cadastrar Contas a Pagar</NavDropdown.Item>
              <NavDropdown.Item href="/TransacaoAtivos">Listar Contas a Pagar</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Relatorios" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Ativos/new">teste</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    </Navbar.Collapse>
</Navbar>
  </Row>
  );
}

export default MyNavBar;