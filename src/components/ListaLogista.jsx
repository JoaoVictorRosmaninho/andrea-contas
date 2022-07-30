import { Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import DetailsBar from './DetailsBar';
import React from "react";
import "./css/logista-component.css"
import axios from "axios";


let baseUrl = "http://localhost:3001/lojistas"

let config = {
	headers : {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd1c3Rhdm8iLCJpYXQiOjE2NTkyMDU2NTksImV4cCI6MTY2NDM4OTY1OSwic3ViIjoiNDNlMWJmNmItYTE5NS00YjQ0LTg4MmQtNzNjYTUxYTU1ZjRhIn0.GLnY8H6JVZiETeOm4xz4MlNORQZaHmRzTMbTqLY4B0s"}
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

	console.log(values);
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
							<tr>
								<td>{element.id}</td>
								<td>{element.nome}</td>
								<td>{element.username}</td>
								<td>
									<Button><a className="table-buttons" href={`/Logistas/edit/${element.id}`}>Editar</a></Button>
									<Button ><a className="table-buttons" href={`/Logistas/edit/${element.id}`}>Deletar</a></Button>
								</td>
							</tr>
						);
					})}
                </tbody>
            </Table>
	</Row>
	)
}