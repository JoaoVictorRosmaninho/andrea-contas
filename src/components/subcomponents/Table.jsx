import React from "react";
import { AgGridReact } from 'ag-grid-react';
import NumberFormat from "../../utils/NumberFormat/NumberFormat";
import { Button } from "react-bootstrap"
import { Container, Row, Col } from "react-bootstrap";
import { parseCookies } from "nookies";
import Modal from 'react-modal';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from "axios";

const url = "http://localhost:3001/contas/realizarpagamento"
const cookies = parseCookies();

const config = {
	headers : { Authorization: "Bearer " + cookies.token }
}


const customStyles = {
    content: {
      height: '200px',
      width: '50%',
      top: '25%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'grey'
    },
  };

export default function Table(props) {
    const [modal, setModal] = React.useState({id: "", modal: false, observacoes: "", valorParcela: 0})
    let subtitle;

    const defaultColDef = React.useMemo(() => {
        return {
          sortable: true,
          resizable: true,
		  floatingFilter:true
        };
      }, []);

      const efetuarPagamento = () => {
          const date = new Date().toISOString();
          axios.post(url + `/${modal.id}`, {dataPagamento: date, valorPagamento: modal.valorParcela}, config)
          .then((resp) => {
              window.alert("Pagamento Efetuado com Sucesso")
              axios.post("http://localhost:3001/contas/list",  {cliente: props.id, ativo: true}, config)
              .then((resp) => {
                  props.setContas(resp.data)
              })
              .catch((err) => {
                  window.alert(err.data)
              })
              setModal({...modal, modal:false})
          })
          .catch((resp) => {
              window.alert(resp.data)
          })
      }

    const [columnDefs] = React.useState([
		{ 
            headerName: 'Valor Atual', 
            field: "valorAtual",
            cellStyle: {textAlign: 'center'},
            filter: 'agNumberColumnFilter',
            suppressMenu: true,
            cellRenderer: (params) => <NumberFormat prefix={"R$ "} value={params.value} decimalScale={2} />
        },
		{ 
            headerName: 'Valor Inicial', 
            field: "valorInicial",
            cellStyle: {textAlign: 'center'},
            filter: 'agNumberColumnFilter',
            suppressMenu: true,
            cellRenderer: (params) => <NumberFormat prefix={"R$ "} value={params.value} decimalScale={2} />
        },
		{ 
            headerName: 'Valor da Parcela', 
            field: "valorParcela", 
            cellStyle: {textAlign: 'center'},
            filter: 'agNumberColumnFilter',
            suppressMenu: true,
            cellRenderer: (params) => <NumberFormat prefix={"R$ "} value={params.value} decimalScale={2} />
        }, 
		{ 
            headerName: 'Observação', 
            cellStyle: {textAlign: 'center'},
            field: "observacoes",
            suppressMenu: true,
            filter: "agTextColumnFilter"
        }, 
		{ 
            headerName: 'Parcela Atual',
            cellStyle: {textAlign: 'center'},
            field: "numeroParcelasAtual", 
            suppressMenu: true,
            filter: 'agNumberColumnFilter',
        },
		{ 
            headerName: 'Nº Parcelas Total', 
            cellStyle: {textAlign: 'center'},
            field: "numeroParcelas",
            suppressMenu: true, 
            filter: 'agNumberColumnFilter',
        },
		{ 
            headerName: 'Vencimento', 
            field: "dataVencimentoFinal",
            suppressMenu: true,
            cellStyle: {textAlign: 'center'},
            valueFormatter: params => new Date(params.value).toLocaleDateString(), 
            filter: 'agDateColumnFilter',
        },
        {
            headerName: 'Ações',  
            cellRenderer: (params) => (
                        <Button 
                            style={{height: "33px"}}
                            onClick={(e) => setModal({
                                        id: params.data.id, 
                                        modal: true, 
                                        observacoes: params.data.observacoes, 
                                        valorParcela: params.data.valorParcela
                                    })}
                            >Pagar</Button>)
        }
	])

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
      }
    
    return (
        <div className="ag-theme-alpine" style={{width: 1400, height: 500}}>
				<AgGridReact
				    columnDefs={columnDefs}
				    rowData={props.rowData}
                    defaultColDef={defaultColDef}
                    onGridReady={(evt) => evt.api.sizeColumnsToFit()}
                    
				/>
            <div id="modal"></div>
			{
            modal.modal && 
                <Modal
                    isOpen={modal.modal}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={() => setModal({...modal, modal:false})}
                    appElement={document.getElementById("teste")}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <Container>
                        <Row>
                            <span>Observação: {modal.observacoes}</span>
                        </Row>
                        <Row>
                            <span>
                                Valor da Parcela: <NumberFormat prefix={"R$ "} value={modal.valorParcela} decimalScale={2} />
                            </span>
                        </Row>

                        <Button 
                            onClick={efetuarPagamento}>
                                Efetuar Pagamento
                        </Button>
                    </Container>
                    
                </Modal> 
            }
		   </div>
    )
} 