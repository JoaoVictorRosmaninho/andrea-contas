import { Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import DetailsBar from './DetailsBar';
import React from "react";
import "./css/logista-component.css"
import axios from "axios";
import MyNavBar from '../components/NavBar';



let baseUrl = "http://localhost:3001/lojistas"

let config = {
	headers : {Authorization: "Bearer " + localStorage.getItem("REACT_TOKEN_AUTH")}
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
	<div>
		<MyNavBar/>
		<DetailsBar icon="list" page_name="Listar Clientes" user_name="Gustavo Goulart" />
            <Table className="ms-3" striped style={{"position":"relative", "left": "100px"}}>
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
									<Button className="table-buttons"><a className="link" href={`/Logistas/edit/${element.id}`}>Editar</a></Button>
									<Button ><a className="link" onClick={() => axios.delete(`http://localhost:3001/lojistas/${element.id}`, config)}>Desabilitar</a></Button>
								</td>
							</tr>
							
						);
					})}
                </tbody>
            </Table>
	</div>
	)
}