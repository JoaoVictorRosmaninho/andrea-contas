import React, { Component}from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { parseCookies } from 'nookies';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import "../css/perfil-subcomponent.css";


const baseUrlContas = "http://localhost:3001/contas/list";
const baseUrlCliente = "http://localhost:3001/clientes/findbyid";
const baseUrlTotalAReceber = "http://localhost:3001/contas/gettotalareceber";

const cookies = parseCookies();

let config = {
	headers : {Authorization: "Bearer " + cookies.token}
}

export default function PerfilCliente({show, hide, id}) {
        let modelStyle ={
            color: '#000000',
        }
        const [valuesCliente, setValuesCliente] = React.useState([]);
        const [valuesContas, setValuesContas] = React.useState([]);
        const [valuesTotalAReceber, setValuesTotalAReceber] = React.useState([]);

        React.useEffect(() => {
            id && axios.get(baseUrlCliente + `/${id}`, config)
            .then((resp) => setValuesCliente(resp.data))
            .catch((err) => console.log(err));

            id && axios.post(baseUrlContas, {cliente: id, ativo: true} , config)
            .then((resp) => setValuesContas(resp.data))
            .catch((err) => console.log(err));

            id && axios.post(baseUrlTotalAReceber, {cliente: id, ativo: true} , config)
            .then((resp) => setValuesTotalAReceber(resp.data))
            .catch((err) => console.log(err));
        }, []);

        const lengthValuesContas = (array) => {
            return ((array).length);
        }
        return(
            <Modal show={show} size="lg" onHide={hide} style={modelStyle} className="modal1">
            <Modal.Header closeButton>
                <Modal.Title><span>Foto de perfil aqui</span>{valuesCliente.nome}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>Ultima Conta Aberta em: {lengthValuesContas(valuesContas) !== 0 ? valuesContas[0].criadoEm: ''}</span>
                <span>Ultimo Pagamento em: </span>
                <div className="tablesContas">
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Observação</th>
                                <th>Valor Atual</th>
                                <th>Vencimento Atual</th>
                                <th>Número de Parcelas</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            valuesContas.map((element) => {
                                return (
                                    <tr>
                                        <td>{element.observacoes}</td>
                                        <td>{element.valorAtual}</td>
                                        <td>{element.dataVencimentoAtual}</td>
                                        <td>{element.numeroParcelasAtual}</td>
                                        <td>
                                            <Button className="table-buttons" ><a className="link">Pagar Conta</a></Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <span>Email: {valuesCliente.email}</span>
                <span>Total a receber: {valuesTotalAReceber}</span>
                <span>Telefone: {valuesCliente.telefone}</span>
            </Modal.Footer>
            </Modal>
        )
}