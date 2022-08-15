import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DetailsBar from './DetailsBar';
import React from "react";
import "./css/logista-component.css"
import "./css/form-validation.css"
import MyNavBar from '../components/NavBar';
import axios from "axios";

let baseUrl = "http://localhost:3001/lojistas/findbyid";

let config = {
	headers : {Authorization: "Bearer " + localStorage.getItem("REACT_TOKEN_AUTH")}
}
console.log(config);

export default function CadastroLogista() {
	let [values, setValues] = React.useState({nome: "",  username: "", senha: "", confirma_senha: ""}); 
	let {id} = useParams();
	let buttonText = id ? "Atualizar" : "Cadastrar";

	React.useEffect(() => {
		if ((values.id === '') && (id !== '')){
			id && axios.get(baseUrl + `/${id}`, config)
			.then((resp) => setValues(resp.data))
			.catch((err) => console.log(err));
		}
	}, []);
	

	const onChangeEvent = (e) => {
		const divAtual = e.target.parentElement;
		validateInput(divAtual);

		const {name, value} = e.target;
		setValues({...values,[name]:value});
	}

	const onSubmit = (e) => {
		e.preventDefault();

		if (isValidate()){
			if (id) {
				axios.patch(`http://localhost:3001/lojistas/update/${id}`, values, config) 
				.then(() => setValues({nome: "", username: "", senha: "", confirma_senha: ""}))
				.catch((err) => console.log(err))
			} else {
			 axios.post("http://localhost:3001/lojistas", values, config)
				.then(() => setValues({nome: "", username: "", senha: ""}))
				.catch((err) => console.log(err))
			}
		}
		else {
			alert("Preencha todos so campos por favor!");
		}

	}


	const isValidate = () => {
		let count = 0;
		const formArray = document.getElementById('formElements');
		for (let index = 0; index < formArray.childNodes.length - 1; index++) {
			let divAtual = formArray.childNodes[index];
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
        nomeProprio (value) {
            value = value.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {
            return a.toUpperCase();
            });

            return value.replace(/\d+/g, '')
        },

        texto (value) {
            return value
        },
    }

	return (
		<div>
			<MyNavBar />
			<DetailsBar icon="edit_note" page_name="Cadastro de Lojista" user_name="Gustavo Goulart" />
			<div className="div-form">
			<form className="needs-validation formCadLojista">
				<div className="formElements" id="formElements">
				<div className="form-item">
					<label htmlFor="nome">Nome:</label> 
					<input type="text"
					value={values.nome}
					id="inputNome"
					placeholder="Entre com o novo nome" name="nome"
					className="form-control" onChange={onChangeEvent}
					data-js="nomeProprio"
					required/>
				</div>
				<div className="form-item"> 
					<label htmlFor="username">Username:</label> 
					<input type="text"
					value={values.username}
					id="inputUsername"
					placeholder="Entre com o novo username"
					name="username"
					className="form-control"
					onChange={onChangeEvent}
					data-js="texto"
					required/>
				</div>
				{
				 id && <div className="form-item"> 
						<label htmlFor="senha">Senha:</label> 
						<input type="password"
						value={values.senha}
						id="inputSenha"
						className="form-control" 
						name="senha"
						placeholder="Entre a nova Senha"
						onChange={onChangeEvent}
						data-js="texto"
						required/>
					 </div>
				    || <div className="form-item">
					 	<label htmlFor="senha">Senha:</label>
					 	<input type="password"
						value={values.senha}
						id="inputSenha"
						className="form-control"
						name="senha"
						placeholder="Senha de cadastro"
						onChange={onChangeEvent}
						data-js="texto"
						required/>
				  	</div>
				}
				{

				  id &&	<div className="form-item"> 
				 		<label htmlFor="senhaConfirmada">Confirmar Senha:</label> 
				 		<input type="password"
						value={values.confirma_senha}
						id="inputSenhaConfirma"
						className="form-control"
						name="confirma_senha"
						placeholder="Entre a nova Senha"
						onChange={onChangeEvent}
						data-js="texto"
						required/>
			  		</div> 
				}
				<div className="divBtn" id="rowBtn">
					<Button className="btn" variant="dark" onClick={onSubmit}>{buttonText}</Button>
				</div>
				</div>
			</form>
		</div>
		</div>
	)
}