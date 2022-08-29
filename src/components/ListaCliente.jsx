import Table from 'react-bootstrap/Table';
import React, { useState } from 'react';
import { Button, Row } from "react-bootstrap";
import axios from 'axios';
import DetailsBar from './DetailsBar';
import MyNavBar from '../components/NavBar';
import "./css/logista-component.css";
import { parseCookies } from 'nookies';
import PerfilCliente from './subcomponents/PerfilCliente';
import TableClientes from './subcomponents/TableClientes'

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
			<Row className="mt-4">
				<TableClientes rowData={values} setRowData={setValues} setTempId={setTempId} handleShow={handleShow} /> 
			</Row>
			{
				show === true ? <PerfilCliente show={handleShow} hide={handleClose} id={idCliente}/>: ''
			}
		</div>
	);
}
