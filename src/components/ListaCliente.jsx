import Table from 'react-bootstrap/Table';
import React from 'react';
import { Button } from "react-bootstrap";
import axios from 'axios';
import { Row } from "react-bootstrap";
import DetailsBar from './DetailsBar';
import "./css/logista-component.css"


let baseUrl = "http://localhost:3001/clientes"

let config = {
	headers : {Authorization: "Bearer " + localStorage.getItem("REACT_TOKEN_AUTH")}
}

export default function ListaCliente() {
	const [values, setValues] = React.useState([]);

    React.useEffect(() => {
        axios.get(baseUrl, config)
            .then((resp) => {
                setValues(resp.data)
            })
            .catch((err) => {
				console.log(err);
			})
    }, [])
/*
	const deleteField = (e, id) => {
		e.preventDefault();
		axios.delete(`http://localhost:3001/clientes/delete/${id}`, config)
		.then(() => window.alert("Registro deletado com sucesso!"))
		.catch (() => window.alert("Erro ao deletar registro"))
	}
*/
	
	return (
		<div>
			<DetailsBar icon="list" page_name="Listar Clientes" user_name="Gustavo Goulart" />
			<Table striped>
				<thead>
					<tr>
						<th>Cliente</th>
						<th>CPF</th>
						<th>Telefone</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{
					values.map((element) => {
						return (
							<tr>
								<td>{element.nome}</td>
								<td>{element.cpf}</td>
								<td>{element.telefone}</td>
								<td>
									<Button className="table-buttons" ><a className="link" href={`/Clientes/edit/${element.id}`}>Editar</a></Button>
									<Button className="table-buttons"  onClick={() => axios.delete(`http://localhost:3001/clientes/${element.id}`)}>Desabilitar</Button>
								</td>
							</tr>
						);
					})}
					
				</tbody>
			</Table>
		</div>
	);
}

/*

				
				{values.map((element) => {
						return (
							<tr>
								<td>{element.nome}</td>
								<td>{element.cpf}</td>
								<td>{element.telefone}</td>
								<td>
									<Button><a className="table-buttons" href={`/Clientes/edit/${element.id}`}>Editar</a></Button>
									<Button ><a className="table-buttons" >Deletar</a></Button>
								</td>
							</tr>
						);
					})}
*/ 