import { Button } from "react-bootstrap"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DetailsBar from './DetailsBar';
import MyNavBar from '../components/NavBar';
import AsyncSelect, { useAsync } from 'react-select/async';
import { createFilter } from 'react-select'
import React from "react";
import axios from "axios";
import "./css/client-component.css";
import { parseCookies } from 'nookies'

const cookies = parseCookies();

let config = {
	headers : {Authorization: "Bearer " + cookies.token}
}


const loadOptions = (Url, name) => {
	return axios
	  .get(Url, config)
		.then((resp) => {
			const options = [];
			const data = Array.from(resp.data);
			data.map((element) => {
			  options.push({label: element[name], value: element.id})
			}) 
			return options;       
		})      
  }


export default function CadastroContas() {
	let buttonText = "Cadastrar";
	const  [values, setValues] = React.useState({
			observacoes: "", 
			numeroParcelas: 0, 
			valorInicial: 0, 
			dataVencimentoInicial: "", 
			fkIdCliente: "" 
		});
	const  [clientes, setClientes] = React.useState([]);

	React.useEffect(() => {
		axios.get("http://localhost:3001/clientes", config)
			.then((resp) => setClientes(resp.data.map((e) => { return {"id": e.id, "nome":e.nome}})))
			.catch((err) => console.log(err));
	}, [])


	const onChangeEvent = (e, name) => {
		if (name) {
			setValues({...values, [name]:e.value})
		} else {
			const {name, value} = e.target;
			if (name === "numeroParcelas" || name === "valorInicial") {
				setValues({...values, [name]:Number(value)});
			} else if (name === "dataVencimentoInicial") {
				const date = new Date(value).toISOString();
				setValues({...values, [name]: date})
			} else {
				setValues({...values,[name]:value});
			}
			
		}
	}

	const onSubmit = (e) => {
		e.preventDefault();

		axios.post("http://localhost:3001/contas", values, config)
			.then(() => { 
				window.alert("Registro Efetuado com sucesso!")
				setValues({observacoes: "",  numeroParcelas: "", valorInicial: "", dataVencimentoInicial: "", fkIdCliente: ""}) 
			})
			.catch ((err) => {
				console.log(err)
				window.alert(err.response.data.message)
			});
	}

	const validateInput = (divAtual) => {
		let count = 0;
		let inputAtual = divAtual.childNodes[1];
		const field = inputAtual.dataset.js;
        inputAtual.value = masks[field](inputAtual.value);

		if (inputAtual.value === '') {
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

	const validaData = (inputData) => {
		console.log(inputData.value);
		let count = 0;
		for (let index = 0; index < inputData.value.length; index++) {
			if(!isNaN(inputData.value)){
				count++;
			}
		}

		if(count === 8){
			return true
		}else{
			addIconAndClass(inputData.parentElement, 'error', 'invalid');
			return false;
		}
	}

	const addIconAndClass = (divAtual, status, statusName) => {
        divAtual.className =`form-item ${statusName}`;
        let img = document.createElement("img");
        img.src = `../${status}_FILL0_wght400_GRAD0_opsz48.svg`;
		if(!(divAtual.childNodes[1].name === 'dataVencimentoInicial')){
			if(divAtual.lastChild.tagName === 'IMG') {
				divAtual.replaceChild(img, divAtual.lastChild);
			}else if(divAtual.lastChild.tagName === 'INPUT'){
				divAtual.appendChild(img);
			}
		}
    }

	const masks = {
		dinheiro (value) {
			const cleanValue = +value.replace(/\D+/g, '')
			const options = { style: 'currency', currency: 'BRL' }
			return new Intl.NumberFormat('pt-br', options).format(cleanValue / 100)
		},

        texto (value) {
            return value
        },

        numero (value) {
            return value
            .replace(/\D+/g, '')
        },
    }

	console.log(values)
	return (
		<div>
			<MyNavBar />
			<DetailsBar icon="edit_note" page_name="Cadastro de Clientes" user_name="Gustavo Goulart" />
			<div className="div-form">
			<form>
				<div> <label htmlFor="" className="bottom-border"> Pessoa </label>  </div> 
				<Row id="rowSelect">
				<AsyncSelect
					cacheOptions
					defaultOptions
					onChange={(e) => onChangeEvent(e, "fkIdCliente")} 
					loadOptions={() => loadOptions("http://localhost:3001/clientes", "nome")}
					filterOption={createFilter({ ignoreAccents: false })}
					/>
			   </Row>
				<Row>
					<Col sm={6}>
						<div className="form-item"> 
						<label htmlFor="observacoes" className="labelNome">Observação:</label> 
						<input type="text"
						placeholder="Entre com a Observação aqui"
						className="form-control"
						name="observacoes"
						onChange={onChangeEvent}
						data-js="texto"
						value={values.observacoes}
						required
						/>
						</div>
					</Col>
					<Col sm={6}>
						<div className="form-item"> 
						<label htmlFor="numeroParcelas" className="labelNParcelas">Numero de parcelas:</label> 
						<input type="text"
						className="form-control"
						placeholder="Entre com o numero de parcelas"
						name="numeroParcelas"
						onChange={onChangeEvent}
						data-js="numero"
						value={values.numeroParcelas}
						required
						/>
						</div>
					</Col>
				</Row>
				<Row>
					<Col sm={6}>
						<div className="form-item">
						<label htmlFor="valorInicial" className="labelValorInicial">Valor Inicial:</label> 
						<input type="text"
						className="form-control"
						placeholder="Entre com o valor inicial"
						name="valorInicial"
						onChange={onChangeEvent}
						data-js="dinheiro"
						value={values.valorInicial}
						required
						/>
						</div>
					</Col>
					<Col sm={6}>
						<div className="form-item">
						<label htmlFor="data" className="labelDataVencimentoInicial">Data de vencimento:</label> 
						<input
						id="inputData"
						type="date"
						className="form-control"
						name="dataVencimentoInicial"
						onChange={onChangeEvent}
						data-js="texto"
						required
						/>
						</div>
					</Col>
				</Row>
				<Row>
				<div id="rowBtn">
					<Button className="btn" variant="dark" onClick={onSubmit}>{buttonText}</Button>
				</div>
				</Row>
			</form>
		</div>
		</div>
	)
}