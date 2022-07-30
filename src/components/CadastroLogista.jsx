import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DetailsBar from './DetailsBar';
import React from "react";
import "./css/logista-component.css"
import axios from "axios";

let baseUrl = "http://localhost:3301/lojistas/update";

let config = {
	headers : {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd1c3Rhdm8iLCJpYXQiOjE2NTkyMDU2NTksImV4cCI6MTY2NDM4OTY1OSwic3ViIjoiNDNlMWJmNmItYTE5NS00YjQ0LTg4MmQtNzNjYTUxYTU1ZjRhIn0.GLnY8H6JVZiETeOm4xz4MlNORQZaHmRzTMbTqLY4B0s"}
}

export default function CadastroLogista() {
	let  [values, setValues] = React.useState({nome: "",  username: "", senha: ""}); 
	let {id} = useParams();
	let buttonText = id ? "Atualizar" : "Cadastrar";
	
	console.log(baseUrl + `/${id}`)
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
		if (id) {

		} else {
		 axios.post("http://localhost:3001/lojistas", values, config)
			.then(console.log)
			.catch ((err) => {
				console.log(err)
			});
		}
	}


	console.log(values);
	return (
		<div className="div-form">
			<DetailsBar icon="edit_note" page_name="Cadastro de Lojista" user_name="Gustavo Goulart" />
			<form>
				<div className="form-item"> 
					<label for>Nome:</label> 
					<input type="text" value={values.nome} placeholder="Entre com o novo nome" name="nome" className="form-control" onChange={onChangeEvent}/>
				</div>
				<div className="form-item"> 
					<label for>Username:</label> 
					<input type="text" value={values.username} placeholder="Entre com o novo username" name="username" className="form-control" onChange={onChangeEvent}/>
				</div>
				<div className="form-item"> 
					<label for>Senha:</label> 
					<input type="text" value={values.senha} className="form-control"  name="senha" placeholder="Entre a nova Senha" onChange={onChangeEvent} />
				</div> 
				<div id="rowBtn">
					<Button className="btn" variant="dark" onClick={onSubmit}>{buttonText}</Button>
				</div>
			</form>
		</div>
	)
}