import React from "react"; 
import MyNavBar from "./NavBar";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { parseCookies } from "nookies";
import NumberFormat from "../utils/NumberFormat/NumberFormat";
import DetailsBar from "./DetailsBar";

const cookies = parseCookies();

const config = {
	headers : { Authorization: "Bearer " + cookies.token }
}



export default function() {
	const [totalAReceber, setTotalAReceber] = React.useState(0);
	const [totalAReceberInadimplentes, setTotalAReceberInandimplentes] = React.useState(0);
	const [totalClientesInadimplentes, settotalClientesInadimplentes] = React.useState(0);
	const [totalClientesAdimplentes, settotalClientesAdimplentes] = React.useState(0);
	const [boletimTotal, setBoletimTotal] = React.useState([]);


	React.useEffect(() => {
		axios.post("http://localhost:3001/contas/gettotalareceber/", { ativo: true }, config)
			.then(resp => setTotalAReceber(resp.data))
			.catch(resp => window.alert(resp.data));

		axios.post("http://localhost:3001/contas/gettotalareceber/", {ativo: true, inadimplentes: true}, 
		config).then(resp => setTotalAReceberInandimplentes(resp.data))
			   .catch(resp => window.alert(resp.data));

		axios.get("http://localhost:3001/clientes/gettotalclientesinadimplentes", config)
			.then(resp => settotalClientesInadimplentes(resp.data))
			.catch(resp => window.alert(resp.data));

		axios.get("http://localhost:3001/clientes/gettotalclientesadimplentes", config)
			.then(resp => settotalClientesAdimplentes(resp.data))
			.catch(resp => window.alert(resp.data));
		
		axios.get("http://localhost:3001/contas/gerarboletim/", config)
			.then(resp => setBoletimTotal(resp.data))
			.catch(resp => window.alert(resp.data))
		
	}, [])

	console.log(boletimTotal)
	return (
		<div>
			<MyNavBar />
			<DetailsBar />
			<Row className="mt-4">
				<Col>
					<div className="div-relatorio">
						<span> Faturamento Total: <NumberFormat 
												value={Number(boletimTotal.faturamentoTotal)}
												prefix={"R$ "}
												decimalScale={2} 
											/></span>
					</div>
				</Col>
			</Row>
			<Row className="mt-4">
				<Col sm={4}>
					<div className="div-relatorio">
						<span> Total a receber:  <NumberFormat prefix={"R$ "} decimalScale={2} value={Number(totalAReceber) + Number(totalAReceberInadimplentes)} /> </span>
					</div>
				</Col> 
				<Col sm={4} >
					<div className="div-relatorio">
					<span> Total a receber de clientes Adimplentes : <NumberFormat prefix={"R$ "} decimalScale={2} value={Number(totalAReceber)} /> </span>
					</div>		
				</Col>
				<Col sm={4} >
					<div className="div-relatorio">
					<span> Total a receber de Inadimplentes: <NumberFormat prefix={"R$ "} decimalScale={2} value={Number(totalAReceberInadimplentes)} /> </span>
					</div>	
				</Col>
			</Row> 
			<Row className="mt-4">
				<Col sm={4} >
					<div className="div-relatorio">
						<span> Total de Clientes Inamdiplentes: { boletimTotal.clientesInadimplentes } </span>
					</div>
				</Col>
				<Col sm={4} >
					<div className="div-relatorio">
						<span> Total de clientes Adimplentes: { boletimTotal.clientesAdimplentes } </span>
					</div>
					
				</Col>
				<Col sm={4} >
					<div className="div-relatorio">
						<span> Total de clientes: { Number(boletimTotal.clientesAdimplentes) + Number(boletimTotal.clientesInadimplentes) } </span>
					</div>	
				</Col>

		   	</Row>
			<Row className="mt-4">
				<Col sm={4}>
					<div className="div-relatorio">
						<span>Total de contas: {boletimTotal.totalContas}</span>
					</div>
				</Col>
				<Col sm={4}>
					<div className="div-relatorio">
						<span>Total de contas inativas: {boletimTotal.contasInativas}</span>
					</div>
				</Col>
				<Col sm={4}>
					<div className="div-relatorio">
						<span>Total de contas ativas: {boletimTotal.contasAtivas}</span>
					</div>
				</Col>
			</Row>

			<Row className="mt-4">
				<Col sm={4}>
					<div className="div-relatorio">
						<span>Total de contas inadimpletes: {boletimTotal.contasInadimplentes}</span>
					</div>
				</Col>
					<Col sm={4}>
						<div className="div-relatorio">
							<span>Total de contas adimplentes: {boletimTotal.contasAdimplentes}</span>
						</div>
					</Col>
			</Row>
		</div>
	)
}