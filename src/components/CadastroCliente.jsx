import { Button } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DetailsBar from './DetailsBar';
import MyNavBar from '../components/NavBar';
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./css/client-component.css";
import "./css/form-validation.css";

let config = {
	headers : {Authorization: "Bearer " + localStorage.getItem("REACT_TOKEN_AUTH")}
}

const baseUrl = "http://localhost:3001/clientes/findbyid";
const init_values = {
            nome: "",  
            sobrenome: "", 
            cpf: "", 
            email: "", 
            telefone: "", 
            observacoes: "", 
            bairro: "", 
            rua: "", 
            cep: "", 
            cidade: "", 
            estado: "", 
            numero: ""
    }


export default function CadastroCliente() {
    const [values, setValues] = React.useState(init_values);
    const { id } = useParams();
	let buttonText = "Cadastrar";

    React.useEffect(() => {
        id && axios.get(baseUrl + `/${id}`, config)
        .then((resp) => setValues(resp.data))
        .catch((err) => console.log(err));
    }, []);

    const onChangeEvent = (e) => {
        const divAtual = e.target.parentElement;
		validateInput(divAtual);

        const {name, value} = e.target;
		setValues({...values,[name]:value});
    }

	const onSubmit = (e) => {
		e.preventDefault();
        setValues(init_values);

        if(isValidate()){
            axios.post("http://localhost:3001/clientes", values, config)
			.then()
			.catch ((err) => {
                console.log(err)
            })

        } else {
            alert("Preencha todos os campos");
        }
	}

	const validateInput = (divAtual) => {
		let count = 0;
		let inputAtual = divAtual.childNodes[1];

        const field = inputAtual.dataset.js;
        inputAtual.value = masks[field](inputAtual.value);

		if ((inputAtual.value === '') ||
            (
                (field === 'cpf' && inputAtual.value.length < 14) ||
                (field === 'cep' && inputAtual.value.length < 9) ||
                (field === 'telefone' && inputAtual.value.length < 15)
            )
            ) {
			count++;
            addIconAndClass(divAtual, 'error', 'invalid');
		}else {
            addIconAndClass(divAtual, 'check', 'valid');
		}

		if(count === 0){
			return true;
		}else {
			return false;
		}
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

    const addIconAndClass = (divAtual, status, statusName) => {
        divAtual.className =`form-item ${statusName}`;
        let img = document.createElement("img");
        img.src = `../${status}_FILL0_wght400_GRAD0_opsz48.svg`;
        if(divAtual.lastChild.tagName === 'IMG') {
            divAtual.replaceChild(img, divAtual.lastChild);
        }else if(divAtual.lastChild.tagName === 'INPUT'){
            divAtual.appendChild(img);
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

	return (
        <div>
            <MyNavBar />
            <DetailsBar icon="edit_note" page_name="Cadastro de Clientes" user_name="Gustavo Goulart" />
            <div className="div-form">
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
                            value={values.nome}
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
                            value={values.sobrenome}
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
                            value={values.cpf}
                            />
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item mt-left"> 
                        <label htmlFor="" className="labelTelefone">Telefone:</label> 
                        <input
                            type="text"
                            className="form-control"
                            placeholder="insira seu telefone"
                            name="telefone"
                            onChange={onChangeEvent}
                            data-js="telefone"
                            value={values.telefone}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div className="form-item" id="observacoes">
                        <label htmlFor="observacoes">Obs:</label>
                        <input
                                type="text"
                                className="form-control"
                                placeholder="Observações"
                                name="observacoes"
                                onChange={onChangeEvent}
                                data-js="texto"
                                value={values.observacoes}
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
                            value={values.rua}
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
                            value={values.bairro}
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
                            value={values.numero}
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
                            value={values.cidade}
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
                            name="estado" 
                            onChange={onChangeEvent}
                            data-js="nomeProprio"
                            value={values.estado}
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
                            value={values.cep}
                            />
                        </div>
                    </Col>
                </Row>
                <div id="rowBtn">
                    <Button className="btn" onClick={onSubmit}>{buttonText}</Button>
                </div>
			</form>
		</div>
        </div>
	)
}