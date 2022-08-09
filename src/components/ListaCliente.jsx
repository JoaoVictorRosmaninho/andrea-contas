import Table from 'react-bootstrap/Table';
import React from 'react';
import { Button } from "react-bootstrap";
import axios from 'axios';
import { Row } from "react-bootstrap";
import DetailsBar from './DetailsBar';


let baseUrl = "http://localhost:3001/clientes"

let config = {
	headers : {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd1c3Rhdm8iLCJpYXQiOjE2NTkyMDU2NTksImV4cCI6MTY2NDM4OTY1OSwic3ViIjoiNDNlMWJmNmItYTE5NS00YjQ0LTg4MmQtNzNjYTUxYTU1ZjRhIn0.GLnY8H6JVZiETeOm4xz4MlNORQZaHmRzTMbTqLY4B0s"}
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
		<Row>
			<DetailsBar icon="list" page_name="Listar Clientes" user_name="Gustavo Goulart" />
			<Table striped>
				<thead>
					<tr>
						<th>Cliente</th>
						<th>CPF</th>
						<th>Telefone</th>
						<th></th>
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
									<Button><a className="table-buttons" href={`/Clientes/edit/${element.id}`}>Editar</a></Button>
									<Button onClick={() => axios.delete(`http://localhost:3001/clientes/${element.id}`)}>Desabilitar</Button>
								</td>
							</tr>
						);
					})}
					
				</tbody>
			</Table>
		</Row>
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