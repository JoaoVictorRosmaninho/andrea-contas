import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';

function MyNavBar() {
  return (
  <Row>
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand >Andrea Contas</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <NavDropdown title="Logistas" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Fundos/new">Cadastrar Logistas</NavDropdown.Item>
              <NavDropdown.Item href="/Fundos">Listar Logistas</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Transações Caixa" id="basic-nav-dropdown">
              <NavDropdown.Item href="/transacaoCaixa/new">
                    Nova Transação
              </NavDropdown.Item>
              <NavDropdown.Item href="/transacaoCaixa" > 
                    Listar Transações
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Transacões de Ativos" id="basic-nav-dropdown">
              <NavDropdown.Item href="/TransacaoAtivos/new">Compra e venda de Ativos</NavDropdown.Item>
              <NavDropdown.Item href="/TransacaoAtivos">Listar Transações</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Ativos" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Ativos/new">Novo Ativo</NavDropdown.Item>
              <NavDropdown.Item href="/Ativos">Listar Ativos</NavDropdown.Item>
              <NavDropdown.Item href="/Ativos/precos/new">Cadastrar Preços</NavDropdown.Item>
              <NavDropdown.Item href="/Ativos/precos">Histórico de preços</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    </Navbar.Collapse>
</Navbar>
  </Row>
  );
}

export default MyNavBar;