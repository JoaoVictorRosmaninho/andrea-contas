import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MyNavBar from '../components/NavBar';
import CadastroLogista from '../components/CadastroLogista';
import CadastroCliente from '../components/CadastroCliente';
import ListaCliente from '../components/ListaCliente';
import ListaLogista from "../components/ListaLogista";
import { Container } from "react-bootstrap";

const Rotas = () => {
  return (

  <BrowserRouter>
    <Container fluid="fluid">
      <MyNavBar/>
      <Routes> 
        <Route element={<CadastroLogista/>} path="/Logistas/new/"/>
        <Route element={<ListaLogista/>} path="/Logistas"/>
        <Route element={<CadastroCliente/>} path="/Clientes/new"/>
        <Route element={<ListaCliente/>} path="/Clientes/"/>
      </Routes>
    </Container>
  </BrowserRouter>
  )
}

export default Rotas; 