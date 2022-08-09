import { Button } from "react-bootstrap"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DetailsBar from './DetailsBar';
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./css/client-component.css"

let config = {
	headers : {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd1c3Rhdm8iLCJpYXQiOjE2NTkyNzU1MTUsImV4cCI6MTY2NDQ1OTUxNSwic3ViIjoiOWE4OWYxNjMtODNkYi00YjU2LTk2NjAtYjQ1MGI4OTNmZWViIn0.W-IPXe5eBpuMmFevTPY9epGbOwXCSDpeubHhgX3VjrM"}
}

const baseUrl = "http://localhost:3001/clientes/findbyid";

export default function CadastroCliente() {

    const  [values, setValues] = React.useState({nome: "",  sobrenome: "", cpf: "", email: "", telefone: "", obervações: "", bairro: "", rua: "", cep: "", cidade: "", estado: "", numero: ""});
    const {id} = useParams();
	
    
    React.useEffect(() => {
        id && axios.get(baseUrl + `/${id}`, config)
        .then((resp) => setValues(resp.data))
        .catch((err) => console.log(err));
    }, []);
    
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


	return (
		<div className="div-form">
            <DetailsBar icon="edit_note" page_name="Cadastro de Clientes" user_name="Gustavo Goulart" />
			<form>
               <div> <label htmlFor="" className="bottom-border"> Pessoa </label>  </div> 
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelNome">Nome:</label> 
                        <input type="text" 
                            placeholder="Pedro Henrique" 
                            className="form-control" 
                            name="nome" 
                            onChange={onChangeEvent}
                            value={values.nome} 
                        />
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelSobrenome">Sobrenome:</label> 
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Pereira Alburquerque" 
                            name="sobrenome" 
                            onChange={onChangeEvent}
                            value={values.sobrenome}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelCPF">CPF:</label> 
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="456.487.159-55" 
                            name="cpf" 
                            onChange={onChangeEvent}
                            value={values.cpf}
                            />
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelTelefone">Telefone:</label> 
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="insira seu telefone" 
                            name="telefone" 
                            onChange={onChangeEvent}
                            value={values.telefone}
                            />
                        </div>
                    </Col>
                </Row>
                <div> <label htmlFor="" className="bottom-border"> Endereço </label>  </div> 
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelRua">Rua:</label> 
                        <input 
                            type="text" 
                            placeholder="Insira o nome da Rua" 
                            className="form-control" 
                            name="rua" 
                            onChange={onChangeEvent}
                            value={values.rua}
                            />
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelBairro">Bairro:</label> 
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Insira o nome do bairro" 
                            name="bairro" 
                            onChange={onChangeEvent}
                            value={values.bairro}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelNumero">Número:</label> 
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Insira o numero da casa" 
                            name="numero" 
                            onChange={onChangeEvent}
                            value={values.numero}
                            />
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelCidade">Cidade:</label> 
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="insira o nome da cidade" 
                            name="cidade" 
                            onChange={onChangeEvent}
                            value={values.cidade}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelEstado">Estado:</label> 
                        <input 
                            type="text" 
                            placeholder="Insira o nome do estado" 
                            className="form-control" 
                            name="estado" 
                            onChange={onChangeEvent}
                            value={values.estado}
                            />
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelCEP">CEP:</label> 
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Insira o Cep" 
                            name="cep" 
                            onChange={onChangeEvent}
                            values={values.cep}
                            />
                        </div>
                    </Col>
                </Row>
                <div> <label htmlFor="" className="bottom-border"> Observação </label>  </div> 
                <label htmlFor="observacoes"></label>
                <input  type="text" name="observacoes" id="observacoes" onChange={onChangeEvent}/>
                <div id="rowBtn">
                    <Button className="btn" onClick={onSubmit}>{buttonText}</Button>
                </div>
			</form>
		</div>
	)
}