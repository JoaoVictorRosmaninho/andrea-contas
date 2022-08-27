import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import MyNavBar from '../components/NavBar';
import CadastroLogista from '../components/CadastroLogista';
import CadastroCliente from '../components/CadastroCliente';
import ListaCliente from '../components/ListaCliente';
import ListaLogista from "../components/ListaLogista";
import CadastroConta from "../components/CadastroContas";
import ListaContas from "../components/ListaContas";
import Login from "../components/Login";
import { Container } from "react-bootstrap";
import { parseCookies } from "nookies";

const Rotas = () => {

  const cookies = parseCookies();
  let isLogged = !! cookies.token;

  React.useEffect(() => {
    isLogged = !! cookies.token;
  }, [cookies])
  return (

  <BrowserRouter>
    <Container fluid="fluid">
      <Routes> 
        <Route element={ isLogged? <CadastroLogista/> : <Navigate to="/"/> } path="/Logistas/new/"/>
        <Route element={ isLogged? <CadastroLogista/> : <Navigate to="/"/> } path="/Logistas/edit/:id"/>
        <Route element={ isLogged? <ListaLogista/>    : <Navigate to="/"/> } path="/Logistas"/>
        <Route element={ isLogged? <CadastroCliente/> : <Navigate to="/"/> } path="/Clientes/new"/>
        <Route element={ isLogged? <ListaCliente/>    : <Navigate to="/"/> } path="/Clientes/"/>
        <Route element={ isLogged? <CadastroCliente/> : <Navigate to="/"/> } path="/Clientes/edit/:id"/>
        <Route element={ isLogged? <CadastroConta/>   : <Navigate to="/"/> } path="/Contas/new"/>
        <Route element={ isLogged? <ListaContas/ >    : <Navigate to="/"/> } path="/Contas"/>
        <Route element={<Login/>} path="/"/>
      </Routes>
    </Container>
  </BrowserRouter>
  )
}

export default Rotas; 