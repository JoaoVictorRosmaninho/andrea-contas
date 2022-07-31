import { Button } from "react-bootstrap"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DetailsBar from './DetailsBar';
import React from "react";
import axios from "axios";
import "./css/client-component.css"

let config = {
	headers : {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd1c3Rhdm8iLCJpYXQiOjE2NTkyNzU1MTUsImV4cCI6MTY2NDQ1OTUxNSwic3ViIjoiOWE4OWYxNjMtODNkYi00YjU2LTk2NjAtYjQ1MGI4OTNmZWViIn0.W-IPXe5eBpuMmFevTPY9epGbOwXCSDpeubHhgX3VjrM'"}
}

export default function CadastroCliente() {

    let  [values, setValues] = React.useState({nome: "",  sobrenome: "", cpf: "", email: "", telefone: "", obervações: "", bairro: "", rua: "", cep: "", cidade: "", estado: "", numero: ""});

	const onChangeEvent = (e) => {
		const {name, value} = e.target;
		setValues({...values,[name]:value});
	}

	const onSubmit = (e) => {
		e.preventDefault();
		axios.post("http://localhost:3001/clientes", values, config)
			.then(console.log)
			.catch ((err) => {
				console.log(err)
			});
	}

	let buttonText = "Cadastrar";

    console.log(values);
	return (
		<div className="div-form">
            <DetailsBar icon="edit_note" page_name="Cadastro de Clientes" user_name="Gustavo Goulart" />
			<form>
               <div> <label htmlFor="" className="bottom-border"> Pessoa </label>  </div> 
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelNome">Nome:</label> 
                        <input type="text" placeholder="Pedro Henrique" className="form-control" name="nome" onChange={onChangeEvent}/>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelSobrenome">Sobrenome:</label> 
                        <input type="text" className="form-control" placeholder="Pereira Alburquerque" name="sobrenome" onChange={onChangeEvent}/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelCPF">CPF:</label> 
                        <input type="text" className="form-control" placeholder="456.487.159-55" name="cpf" onChange={onChangeEvent}/>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelTelefone">Telefone:</label> 
                        <input type="text" className="form-control" placeholder="(32) 9 3456-7849" name="telefone" onChange={onChangeEvent}/>
                        </div>
                    </Col>
                </Row>
                <div> <label htmlFor="" className="bottom-border"> Endereço </label>  </div> 
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelRua">Rua:</label> 
                        <input type="text" placeholder="Pedro Henrique" className="form-control" name="rua" onChange={onChangeEvent}/>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelBairro">Bairro:</label> 
                        <input type="text" className="form-control" placeholder="Pereira Alburquerque" name="bairro" onChange={onChangeEvent}/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelNumero">Número:</label> 
                        <input type="text" className="form-control" placeholder="456.487.159-55" name="numero" onChange={onChangeEvent}/>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelCidade">Cidade:</label> 
                        <input type="text" className="form-control" placeholder="(32) 9 3456-7849" name="cidade" onChange={onChangeEvent}/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelEstado">Estado:</label> 
                        <input type="text" placeholder="Pedro Henrique" className="form-control" name="estado" onChange={onChangeEvent}/>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelCEP">CEP:</label> 
                        <input type="text" className="form-control" placeholder="Pereira Alburquerque" name="cep" onChange={onChangeEvent}/>
                        </div>
                    </Col>
                </Row>
                <div> <label htmlFor="" className="bottom-border"> Observação </label>  </div> 
                {/*
                 <Row>
                    <Col sm={6}>
                        <div className="form-item divFile"> 
                        <input type="file" id="file" className="form-control" accept="image/*"/>
                        <label for="file">SELECIONAR IMAGEM
                        <span class="material-icons">account_box</span>
                        </label>
                        </div>
                    </Col>
                    </Row>                 
                */}
                <label htmlFor="observacoes"></label>
                <input type="text" name="observacoes" id="observacoes" onChange={onChangeEvent}/>
                <div id="rowBtn">
                    <Button className="btn" onClick={onSubmit}>{buttonText}</Button>
                </div>
			</form>
		</div>
	)
}