import React from "react";
import { AgGridReact } from 'ag-grid-react';
import NumberFormat from "../../utils/NumberFormat/NumberFormat";
import { Button } from "react-bootstrap"
import { Container, Row, Col } from "react-bootstrap";
import { parseCookies } from "nookies";
import Modal from 'react-modal';
import "../css/modal-TableContas.css";

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
      height: '270px',
      width: '50%',
      top: '25%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '0',
    },
    overlay: {
        backgroundColor: 'rgba(10, 10, 10, 0.60)'
    }
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

      const onChangeValue = (e) => {
        const { value } = e.target; 
        setModal({...modal, valorParcela: Number(value)})
      }

      const efetuarPagamento = () => {
          const date = new Date().toISOString();
          axios.post(url + `/${modal.id}`, {dataPagamento: date, valorPagamento: modal.valorParcela}, config)
          .then((resp) => {
              window.alert("Pagamento Efetuado com Sucesso")
              if (props.type === "cliente") {
                axios.post("http://localhost:3001/contas/list",  {cliente: props.id, ativo: true}, config)
                .then((resp) => {
                    props.setContas(resp.data)
                })
                .catch((err) => {
                    window.alert("Erro ao atualizar tabela")
                })
              } else if (props.type === "periodo") {
                if (props.data.startDate && props.data.endDate) {
                    axios.post("http://localhost:3001/contas/list", props.data, config)
                        .then(resp => props.setContas(resp.data))
                        .catch(resp => window.alert(resp.data))
                }
              }
              setModal({...modal, modal:false})
          })
          .catch((resp) => {
              window.alert(resp.data)
          })
      }

      const inativarConta = (id) => {
          axios.patch(`http://localhost:3001/contas/inativarconta/${id}`, {}, config)
          .then(() => {
              window.alert("conta desabilitada com sucesso!");
              if (props.type === "cliente") {
                axios.post("http://localhost:3001/contas/list",  {cliente: props.id, ativo: true}, config)
                .then((resp) => {
                    props.setContas(resp.data)
                })
                .catch((err) => {
                    window.alert("Erro ao atualizar tabela")
                })
              } else if (props.type === "periodo") {
                if (props.data.startDate && props.data.endDate) {
                    axios.post("http://localhost:3001/contas/list", props.data, config)
                        .then(resp => props.setContas(resp.data))
                        .catch(resp => window.alert("Erro ao atualizar tabela"))
                }
              }

          })
      }

    const [columnDefs] = React.useState([
        {
           headerName: 'Cliente', 
           width: 100,
           field: "cliente.nome", 
           filter: 'agNumberColumnFilter',
           cellStyle: {textAlign: 'center'}
        },
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
            cellStyle: {textAlign: 'center'},
            cellRenderer: (params) => (
                    <div>
                        <Button 
                            style={{height: "33px", width: "50%", fontSize: "14px"}}
                            onClick={(e) => setModal({
                                        id: params.data.id, 
                                        modal: true, 
                                        observacoes: params.data.observacoes, 
                                        valorParcela: params.data.valorParcela
                                    })}
                            >
                                Pagar
                        </Button>
                        <Button style={{height: "33px", width: "50%", fontSize: "14px", marginLeft: "3px"}}
                            onClick={() => inativarConta(params.data.id)}
                        >
                            Inativar
                        </Button>
                    </div>
                )
        }
	])

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
      }
    console.log(modal)
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
                        <div className="row2">
                            <span id="titulo">Observação: {modal.observacoes}</span>
                        </div>
                        <div className="linha"></div>
                        <div className="row2">
                            <span>
                                Valor da Parcela: 
                                <input type="text"
						            className="form-control"
						            name="observacoes"
						            onChange={onChangeValue}
						            data-js="texto"
						            value={modal.valorParcela}
						            required
						        />
                            </span>
                        </div>
                        <div className="linha"></div>
                        <div id="btnPagar">
                            <Button
                                onClick={efetuarPagamento}>
                                    Efetuar Pagamento
                            </Button>
                        </div>
                        
                    </Container>
                    
                </Modal> 
            }
		   </div>
    )
} 