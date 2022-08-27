import Table from 'react-bootstrap/Table';
import React from 'react';
import { Button } from "react-bootstrap";
import axios from 'axios';
import { Row } from "react-bootstrap";
import DetailsBar from './DetailsBar';
import MyNavBar from '../components/NavBar';
import "./css/logista-component.css"
import { parseCookies } from 'nookies'


let baseUrl = "http://localhost:3001/clientes"

const cookies = parseCookies();

let config = {
	headers : {Authorization: "Bearer " + cookies.token}
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
			<MyNavBar/>
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
									<Button className="table-buttons"  onClick={() => axios.delete(`http://localhost:3001/clientes/${element.id}`, config)}>Desabilitar</Button>
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