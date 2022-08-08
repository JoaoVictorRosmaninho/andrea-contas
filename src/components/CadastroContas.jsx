import { Button } from "react-bootstrap"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DetailsBar from './DetailsBar';
import Form from 'react-bootstrap/Form';
import React from "react";
import axios from "axios";
import "./css/client-component.css"

let config = {
	headers : {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd1c3Rhdm8iLCJpYXQiOjE2NTkyNzU1MTUsImV4cCI6MTY2NDQ1OTUxNSwic3ViIjoiOWE4OWYxNjMtODNkYi00YjU2LTk2NjAtYjQ1MGI4OTNmZWViIn0.W-IPXe5eBpuMmFevTPY9epGbOwXCSDpeubHhgX3VjrM"}
}



export default function CadastroContas() {

    const  [values, setValues] = React.useState({observacoes: "",  numeroParcelas: "", valorInicial: "", dataVencimentoInicial: "", fk_id_cliente: ""});
    const  [clientes, setClientes] = React.useState([]);
	
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

    React.useEffect(() => {
        axios.get("http://localhost:3001/clientes", config)
            .then((resp) => setClientes(resp.data.map((e) => { return {"id": e.id, "nome":e.nome}})))
            .catch((err) => console.log(err));
    }, [])

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
                        <label for className="labelNome">Observação:</label> 
                        <input type="text" placeholder="Entre com a Observação aqui" className="form-control" name="observacoes" onChange={onChangeEvent}/>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelSobrenome">Numero de parcelas:</label> 
                        <input type="text" className="form-control" placeholder="Entre com o numero de parcelas" name="numeroParcelas" onChange={onChangeEvent}/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelCPF">Valor Inicial:</label> 
                        <input type="text" className="form-control" placeholder="456.487.159-55" name="valorInicial" onChange={onChangeEvent}/>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelTelefone">Data de vencimento:</label> 
                        <input type="date" className="form-control" name="dataVencimentoInicial" onChange={onChangeEvent}/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div className="form-item">
                        <Form.Select aria-label="Default select example" >
                         {
                             clientes.map((e) =>  (
                                <option value={e.id} name="fk_id_cliente" >{e.nome}</option>
                             ))
                         }
                        </Form.Select>
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
	)
}