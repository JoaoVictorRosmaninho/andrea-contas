import React, { Component}from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { parseCookies } from 'nookies';
import axios from "axios";

let baseUrlContas = "http://localhost:3001/contas"
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

        React.useEffect(() => {
            id && axios.get(baseUrlCliente + `/${id}`, config)
            .then((resp) => setValuesCliente(resp.data))
            .catch((err) => console.log(err));
        }, []);
        /*
        React.useEffect(() => {
            id && axios.post(baseUrlCliente + `/${id}`,{cliente: id, ativo: true} ,config)
            .then((resp) => setValuesCliente(resp.data))
            .catch((err) => console.log(err));
        }, []);*/

        console.log(id);
        return(
            <Modal show={show} onHide={hide} style={modelStyle}>
            <Modal.Header closeButton>
                <Modal.Title><span>Foto de perfil aqui</span>{valuesCliente.nome}</Modal.Title>
                
            </Modal.Header>
            <Modal.Body>
                <span>Email: {valuesCliente.email}</span>
                <span>Ultima Conta Aberta em: </span>
                <span>Ultimo Pagamento em: </span>

            </Modal.Body>
            <Modal.Footer>
                <span>Total a receber: </span>
                <span>Telefone: {valuesCliente.telefone}</span>
                <Button variant="secondary" onClick={hide}>
                Close
                </Button>
            </Modal.Footer>
            </Modal>
        )
}