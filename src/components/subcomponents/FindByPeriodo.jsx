import React from "react"; 
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { parseCookies } from 'nookies';
import Table from "./TableContas";

const url = "http://localhost:3001/contas/list"
const cookies = parseCookies();

let config = {
	headers : { Authorization: "Bearer " + cookies.token }
}
export default function FindByPeriodo() {
    const [data, setData] = React.useState({startDate: "", endDate: "", ativo: true, inadimplentes: false}); 
    const [contas, setContas] = React.useState([]);
    const [id, setId] = React.useState("");

    
    React.useEffect(() => {
        if (data.startDate && data.endDate) {
            axios.post(url, data, config)
                .then(resp => setContas(resp.data))
                .catch(resp => window.alert(resp.data))
        }
    }, [data])
    
    const onChangeEvent = (e) => {
        const {name, value} = e.target; 
        if (["ativo", "inadimplentes"].includes(name)) {
            setData({...data, [name]: !data[name]})
        } 
        else {
            e.preventDefault()
            const date = new Date(value).toISOString()
            setData({...data, [name]:date})
        }   
           
    }

    console.log(data)
    return (
        <Form>
            <Row>
                <Col sm={6}>
				    <div className="form-item">
						<label htmlFor="data" className="labelDataVencimentoInicial">Data Inicial:</label> 
						<input
						    id="inputData"
						    type="date"
						    className="form-control"
						    name="startDate"
						    onChange={onChangeEvent}
						    data-js="texto"
						    required
						/>
					</div>
				</Col>
                <Col sm={6}>
				    <div className="form-item">
						<label htmlFor="data" className="labelDataVencimentoInicial">Data Final:</label> 
						<input
						    id="inputData"
						    type="date"
						    className="form-control"
						    name="endDate"
						    onChange={onChangeEvent}
						    data-js="texto"
						    required
						/>
					</div>
				</Col>

            </Row>
            <Row>
                <Col sm={3}>
                    <Form.Check className="ml-3" 
                        type="switch"
                        id="custom-switch"
                        name="ativo"
                        label={data.ativo ? "Contas Ativas" : "Contas não Ativas"}
                        onChange={onChangeEvent}
                    />
                </Col>
                <Col sm={3}>
                    <Form.Check className="ml-3" 
                        type="switch"
                        id="custom-switch"
                        name="inadimplentes"
                        label={data.inadimplentes ? "Contas inadimplentes " : "Contas adimplentes"}
                        onChange={onChangeEvent}
                    />
                </Col>
            </Row>
            <Row className="mt-4">
                <Table rowData={contas} setContas={setContas} data={data}  type={"periodo"}/>
            </Row>
        </Form>
    )
}