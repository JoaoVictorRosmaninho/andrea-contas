import React from "react"; 
import Form from 'react-bootstrap/Form';
import { parseCookies } from 'nookies';
import { Row } from "react-bootstrap";
import Table from "./Table";



const cookies = parseCookies();


export default function() {
	React.useEffect(() => {
		
	}, [])

	return (
		<div>
			<Row>
				<span> Lojista: {cookies.client} </span>
			</Row>
			<Row>

			</Row>
		</div>
	)
}