import Table from 'react-bootstrap/Table';
import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import axios from 'axios';
import DetailsBar from './DetailsBar';
import MyNavBar from '../components/NavBar';
import "./css/logista-component.css";
import { parseCookies } from 'nookies';
import PerfilCliente from './subcomponents/PerfilCliente';

let baseUrl = "http://localhost:3001/clientes"

const cookies = parseCookies();

let config = {
	headers : {Authorization: "Bearer " + cookies.token}
}
let idCliente = "id aqui";

export default function ListaCliente() {
	const [values, setValues] = React.useState([]);
	const [show, setShow] = useState(false);

	const handleShow = () => setShow(true);
	const setTempId = (id) => {
		idCliente = id;
	}
	const handleClose = () => setShow(false);

    React.useEffect(() => {
        axios.get(baseUrl, config)
            .then((resp) => {
                setValues(resp.data)
            })
            .catch((err) => {
				console.log(err);
			})
    }, [])

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
									<Button variant="primary" onClick={() => {handleShow(); setTempId(element.id)}} >Perfil</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
			{
				show === true ? <PerfilCliente show={handleShow} hide={handleClose} id={idCliente}/>: ''
			}
		</div>
	);
}
