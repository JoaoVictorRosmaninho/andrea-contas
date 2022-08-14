import { Button } from "react-bootstrap"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DetailsBar from './DetailsBar';
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./css/client-component.css"
import "./css/form-validation.css"

let config = {
	headers : {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd1c3Rhdm8iLCJpYXQiOjE2NTkyNzU1MTUsImV4cCI6MTY2NDQ1OTUxNSwic3ViIjoiOWE4OWYxNjMtODNkYi00YjU2LTk2NjAtYjQ1MGI4OTNmZWViIn0.W-IPXe5eBpuMmFevTPY9epGbOwXCSDpeubHhgX3VjrM"}
}

const baseUrl = "http://localhost:3001/clientes/findbyid";

export default function CadastroCliente() {
    const [values, setValues] = React.useState({nome: "",  sobrenome: "", cpf: "", email: "", telefone: "", observacoes: "", bairro: "", rua: "", cep: "", cidade: "", estado: "", numero: ""});
    const {id} = useParams();
	let buttonText = "Cadastrar";
    
    React.useEffect(() => {
        id && axios.get(baseUrl + `/${id}`, config)
        .then((resp) => setValues(resp.data))
        .catch((err) => console.log(err));
    }, []);
    
    const onChangeEvent = (e) => {
		const {name, value} = e.target;
		setValues({...values,[name]:value});

        const divAtual = e.target.parentElement;
		validateInput(divAtual);
    }

	const onSubmit = (e) => {
		e.preventDefault();

        if(isValidate()){
            axios.post("http://localhost:3001/clientes", values, config)
			.then(console.log)
			.catch ((err) => {
				console.log(err)
			});
        }else {
            alert("Preencha todos os campos");
        }
		
	}

	
    const masks = {
        cpf (value) {
          return value
            .replace(/\D+/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
        },

        telefone (value) {
          return value
            .replace(/\D+/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
            .replace(/(-\d{4})\d+?$/, '$1')
        },

        cep (value) {
          return value
            .replace(/\D+/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1')
        },

        nomeProprio (value) {
            value = value.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {
            return a.toUpperCase();
            });

            return value.replace(/\d+/g, '')
        },

        texto (value) {
            return value
        },

        numero (value) {
            return value
            .replace(/\D+/g, '')
        },
    }
      

    const isValidate = () => {
		let count = 0;
		const formArray = document.getElementsByClassName('form-item');
		for (let index = 0; index < formArray.length; index++) {
			let divAtual = formArray[index];
			if(!validateInput(divAtual)){
				count++;
			}
		}
		if(count === 0){
			return true;
		}else {
			return false;
		}
	}

	const validateInput = (divAtual) => {
		let count = 0;
		let inputAtual = divAtual.childNodes[1];
        const field = inputAtual.dataset.js;
        inputAtual.value = masks[field](inputAtual.value);
        console.log(inputAtual.value);
		if (inputAtual.value === '') {
			count++;
			divAtual.className ="form-item invalid";
			var img = document.createElement("img");
			img.src = "../error_FILL0_wght400_GRAD0_opsz48.svg";
			if(divAtual.lastChild.tagName === 'IMG') {
				divAtual.replaceChild(img, divAtual.lastChild);
			}else if(divAtual.lastChild.tagName === 'INPUT'){
				divAtual.appendChild(img);
			}
		}else {
			divAtual.className ="form-item valid";
			var img = document.createElement("img");
			img.src = "../check_FILL0_wght400_GRAD0_opsz48.svg";
			if(divAtual.lastChild.tagName === 'IMG') {
				divAtual.replaceChild(img, divAtual.lastChild);
			}else if(divAtual.lastChild.tagName === 'INPUT'){
				divAtual.appendChild(img);
			}
		}
		if(count === 0){
			return true;
		}else {
			return false;
		}
	}

	return (
		<div className="div-form">
            <DetailsBar icon="edit_note" page_name="Cadastro de Clientes" user_name="Gustavo Goulart" />
			<form>
               <div> <label htmlFor="" className="bottom-border"> Pessoa </label>  </div> 
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label htmlFor="nome" className="labelNome">Nome:</label> 
                        <input type="text" 
                            placeholder="Pedro Henrique" 
                            className="form-control" 
                            name="nome" 
                            onChange={onChangeEvent}
                            data-js="nomeProprio"
                        />
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label htmlFor="" className="labelSobrenome">Sobrenome:</label> 
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Pereira Alburquerque" 
                            name="sobrenome"
                            onChange={onChangeEvent}
                            data-js="nomeProprio"
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label htmlFor="" className="labelCPF">CPF:</label> 
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="456.487.159-55"
                            name="cpf"
                            onChange={onChangeEvent}
                            data-js="cpf"
                            />
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label htmlFor="" className="labelTelefone">Telefone:</label> 
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="insira seu telefone" 
                            name="telefone" 
                            onChange={onChangeEvent}
                            data-js="telefone"
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div className="form-item" id="observacoes">
                        <label htmlFor="observacoes">Observações:</label>
                        <input
                                type="text"
                                className="form-control"
                                placeholder="Observações"
                                name="observacoes"
                                onChange={onChangeEvent}
                                data-js="texto"
                                />
                        </div>
                    </Col>
                    <Col sm={6}></Col>
                </Row>
                <div> <label className="bottom-border"> Endereço </label>  </div> 
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label htmlFor="rua" className="labelRua">Rua:</label> 
                        <input 
                            type="text" 
                            placeholder="Insira o nome da Rua" 
                            className="form-control" 
                            name="rua" 
                            onChange={onChangeEvent}
                            data-js="nomeProprio"
                            />
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label htmlFor="" className="labelBairro">Bairro:</label> 
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Insira o nome do bairro" 
                            name="bairro" 
                            onChange={onChangeEvent}
                            data-js="nomeProprio"
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label htmlFor="" className="labelNumero">Número:</label> 
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Insira o numero da casa" 
                            name="numero" 
                            onChange={onChangeEvent}
                            data-js="numero"
                            />
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label htmlFor="" className="labelCidade">Cidade:</label> 
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="insira o nome da cidade" 
                            name="cidade" 
                            onChange={onChangeEvent}
                            data-js="nomeProprio"
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label htmlFor="" className="labelEstado">Estado:</label> 
                        <input 
                            type="text" 
                            placeholder="Insira o nome do estado" 
                            className="form-control" 
                            name="nomeProprio" 
                            onChange={onChangeEvent}
                            data-js="nomeProprio"
                            />
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label htmlFor="" className="labelCEP">CEP:</label> 
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Insira o Cep" 
                            name="cep" 
                            onChange={onChangeEvent}
                            data-js="cep"
                            />
                        </div>
                    </Col>
                </Row>
                <div id="rowBtn">
                    <Button className="btn" onClick={onSubmit}>{buttonText}</Button>
                </div>
			</form>
		</div>
	)
}