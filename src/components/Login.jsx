import { Button } from "react-bootstrap"
import Row from 'react-bootstrap/Row';
import { Container } from "react-bootstrap";
import React  from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [values, setValues] = React.useState({username: "", senha: ""});
  let navigate = useNavigate();


  const onChangeEvent = (e) => {
	e.preventDefault();
	const {name, value} = e.target;
	setValues({...values, [name]:value});
  }

  const onSubmit = () => {
	axios.post("http://localhost:3001/sessions", values)
		.then((resp) => {
			localStorage.setItem('REACT_TOKEN_AUTH', resp.data.token);
			navigate("/Logistas", { replace: true })

		})
		.catch((err) => {
			console.log("erro")
		})
  }

  return(
	  <Container>
		<Row>
			<div className="form-login">
				<div className="form-item">
					<label htmlFor="" className="labelSobrenome">Username:</label> 
					<input 
						type="text" 
						className="form-control" 
						placeholder="Login" 
						name="username"
						onChange={(e) => onChangeEvent(e)}
						/>
				</div>
			<div className="form-item">
				<label htmlFor="" className="labelSobrenome">password:</label>
					<input 
						type="text" 
						className="form-control" 
						placeholder="Login"
						name="senha" 
						onChange={(e) => onChangeEvent(e)}
						/>
				</div>
				<Button className="btn" onClick={onSubmit}>Entrar</Button>
			</div>
		</Row>
	  </Container>
  )
}