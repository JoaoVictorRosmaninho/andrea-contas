import { Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import DetailsBar from './DetailsBar';
import React from "react";
import "./css/logista-component.css"
import axios from "axios";


let baseUrl = "http://localhost:3001/lojistas"

let config = {
	headers : {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd1c3Rhdm8iLCJpYXQiOjE2NTk5MTgyMTIsImV4cCI6MTY2NTEwMjIxMiwic3ViIjoiNWViNDllMTgtYzc5Mi00YTEwLWI0ZWQtYzM1ZTNlMGMxMGU5In0.oBOcQvuw3qof99OmZXXGuwBg2hiEh4uwOooDnLfT9b4"}
}


export default function ListaLogista() {
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

	const deleteField = (e, id) => {
		e.preventDefault();
		axios.delete(`http://localhost:3001/lojistas/delete/${id}`, config)
		.then(() => window.alert("Registro deletado com sucesso!"))
		.catch (() => window.alert("Erro ao deletar registro"))
	}

	return (
	<Row>
		<DetailsBar icon="list" page_name="Listar Clientes" user_name="Gustavo Goulart" />
            <Table striped>
                <thead>
                    <tr>
                        <th align="center">id</th>
                        <th>Nome</th>
                        <th>Username</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
					{values.map((element) => {
						return (
							<tr >
								<td>{element.id}</td>
								<td>{element.nome}</td>
								<td>{element.username}</td>
								<td>
									<Button><a className="table-buttons" href={`/Logistas/edit/${element.id}`}>Editar</a></Button>
									<Button ><a className="table-buttons" >Desabilitar</a></Button>
								</td>
							</tr>
						);
					})}
                </tbody>
            </Table>
	</Row>
	)
}