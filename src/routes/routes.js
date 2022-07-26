import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

const Rotas = () => {
  return (

  <BrowserRouter>
    <Container fluid="fluid">
      <Routes> 
        <Route element={<CadastroLogista/>} path="/Cadastrarlogista" /> 
      </Routes>
    </Container>
  </BrowserRouter>
  )
}

export default Rotas; 