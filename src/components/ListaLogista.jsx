import DetailsBar from './DetailsBar';
import React from "react";
import "./css/logista-component.css"
import axios from "axios";
import MyNavBar from '../components/NavBar';
import { parseCookies } from 'nookies';
import TableUsers from "./subcomponents/TableUsers"
import Row from 'react-bootstrap/Row';



let baseUrl = "http://localhost:3001/lojistas"

const cookies = parseCookies();

let config = {
	headers : {Authorization: "Bearer " + cookies.token}
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

	return (
	<div>
		<MyNavBar/>
		<DetailsBar icon="list" page_name="Listar Clientes" user_name="Gustavo Goulart" />
		<Row className="mt-4">
			<TableUsers rowData={values} setData={setValues} />
		</Row>
	</div>
	)
}