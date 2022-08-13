import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DetailsBar from './DetailsBar';
import React from "react";
import "./css/logista-component.css"
import "./css/form-validation.css"
import axios from "axios";

let baseUrl = "http://localhost:3001/lojistas/findbyid";

let config = {
	headers : {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd1c3Rhdm8iLCJpYXQiOjE2NTkyNzU1MTUsImV4cCI6MTY2NDQ1OTUxNSwic3ViIjoiOWE4OWYxNjMtODNkYi00YjU2LTk2NjAtYjQ1MGI4OTNmZWViIn0.W-IPXe5eBpuMmFevTPY9epGbOwXCSDpeubHhgX3VjrM"}
}

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
		const {name, value} = e.target;
		setValues({...values,[name]:value});

		const divAtual = e.target.parentElement;
		validateInput(divAtual);
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

	console.log(values);
	return (
		<div className="div-form">
			<DetailsBar icon="edit_note" page_name="Cadastro de Lojista" user_name="Gustavo Goulart" />
			<form className="needs-validation formCadLojista">
				<div className="formElements" id="formElements">
				<div className="form-item">
					<label htmlFor="nome">Nome:</label> 
					<input type="text" value={values.nome} id="inputNome" placeholder="Entre com o novo nome" name="nome" className="form-control" onChange={onChangeEvent} required/>
				</div>
				<div className="form-item"> 
					<label htmlFor="username">Username:</label> 
					<input type="text" value={values.username} id="inputUsername" placeholder="Entre com o novo username" name="username" className="form-control" onChange={onChangeEvent} required/>
				</div>
				{
				 id && <div className="form-item"> 
						<label htmlFor="senha">Senha:</label> 
						<input type="password" value={values.senha} id="inputSenha" className="form-control"  name="senha" placeholder="Entre a nova Senha" onChange={onChangeEvent} required/>
					 </div> 
				    || <div className="form-item"> 
					 	<label htmlFor="senha">Senha:</label> 
					 	<input type="password" value={values.senha} id="inputSenha" className="form-control"  name="senha" placeholder="Senha de cadastro" onChange={onChangeEvent} required/>
				  	</div> 
				}
				{

				  id &&	<div className="form-item"> 
				 		<label htmlFor="senhaConfirmada">Confirmar Senha:</label> 
				 		<input type="password" value={values.confirma_senha} id="inputSenhaConfirma" className="form-control"  name="confirma_senha" placeholder="Entre a nova Senha" onChange={onChangeEvent} required/>
			  		</div> 
				}
				<div className="divBtn" id="rowBtn">
					<Button className="btn" variant="dark" onClick={onSubmit}>{buttonText}</Button>
				</div>
				</div>
			</form>
		</div>
	)
}