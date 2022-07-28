import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MyNavBar from '../components/NavBar';
import CadastroLogista from '../components/CadastroLogista';
import { Container } from "react-bootstrap";

const Rotas = () => {
  return (

  <BrowserRouter>
    <Container fluid="fluid">
      <MyNavBar/>
      <Routes> 
        <Route element={<CadastroLogista/>} path="/Logistas/new" /> 
      </Routes>
    </Container>
  </BrowserRouter>
  )
}

export default Rotas; 