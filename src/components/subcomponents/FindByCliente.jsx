import React from "react";
import AsyncSelect from 'react-select/async';
import { parseCookies } from 'nookies'
import { createFilter } from 'react-select'
import { Row } from "react-bootstrap";
import Table from "./Table";

import axios from 'axios';

const cookies = parseCookies();

let config = {
	headers : { Authorization: "Bearer " + cookies.token }
}

let url = "http://localhost:3001/contas/list"


export default function FindByCliente() {

	const [id, setId] = React.useState("");
	const [contas, setContas] = React.useState([]);

	const [columnDefs] = React.useState([
		{ headerName: 'Valor Atual', field: "valorAtual" },
		{ headerName: 'Valor Inicial', field: "valorInicial" },
		{ headerName: 'Valor da Parcela', field: "valorParcela" }, 
		{ headerName: 'Observação', field: "observacoes" }, 
		{ headerName: 'Parcela Atual', field: "numeroParcelasAtual"},
		{ headerName: 'Nº Parcelas Total', field: "numeroParcelas" },
		{ headerName: 'Vencimento', field: "dataVencimentoFinal" },
	])


	const onChangeEvent = (e) => {
		setId(e.value)
	}
	const loadOptions = (url) => {
		return axios
		.get(url, config)
		  .then((resp) => {
			  const options = [];
			  const data = Array.from(resp.data);
			  data.map((element) => {
				options.push({label: element.nome, value: element.id})
			  }) 
			  return options;
		  })
	}

	React.useEffect(() => {
		axios.post(url,  {cliente: id, ativo: true}, config)
			.then((resp) => {
				setContas(resp.data)
			})
			.catch((err) => {
				window.alert(err.data)
			})
	}, [id])

	console.log(id)

	return (
		<div>
			<Row>
			<span>Escolha o Cliente</span>
			
			<AsyncSelect
					cacheOptions
					defaultOptions
					onChange={(e) => onChangeEvent(e)} 
					loadOptions={() => loadOptions("http://localhost:3001/clientes")}
					filterOption={createFilter({ ignoreAccents: false })}
			/>
			</Row>
			<Row className="mt-3">
				<Table rowData={contas} setContas={setContas} id={id}></Table>
			</Row>
		</div>
	)
}