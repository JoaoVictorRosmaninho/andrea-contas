import React from "react";
import { AgGridReact } from 'ag-grid-react';
import { Button } from "react-bootstrap"
import { parseCookies } from "nookies";


import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const cookies = parseCookies();

const config = {
	headers : { Authorization: "Bearer " + cookies.token }
}


export default function TableUsers(props) {
    const navigate = useNavigate();

    const defaultColDef = React.useMemo(() => {
        return {
          sortable: true,
          resizable: true,
          filter:true
        };
      }, []);

      const desabilitar = (id) => {
        axios.delete(`http://localhost:3001/lojistas/${id}`, config)
          .then(resp => {
              window.alert("Desabilitado com sucesso! ");
              axios.get("http://localhost:3001/lojistas", config)
                .then(resp => props.setData(resp.data))
                .catch(resp => window.alert("Erro ao atualizar tabela"))
          })
          .catch(resp => window.alert("Erro ao desabilitar"))
      }

    const [columnDefs] = React.useState([
		{ 
            headerName: 'Nome', 
            field: "nome",
            cellStyle: {textAlign: 'center'},
            filter: 'agNumberColumnFilter'
        },
		{ 
            headerName: 'Username', 
            field: "username",
            cellStyle: {textAlign: 'center'},
            filter: 'agNumberColumnFilter'
        },
        {
            headerName: 'Ações',  
            cellStyle: {textAlign: 'center'},
            cellRenderer: (params) => (
                    <span>
                         <Button style={{height: "33px", width: "40%"}}
                            onClick={() => navigate(`/Logistas/edit/${params.data.id}`)}
                         >
                            Editar
                        </Button>
                        <Button style={{height: "33px", width: "40%"}} onClick={(e) => desabilitar(params.data.id)} >
                            Deletar
                        </Button>
                    </span>
                )
        }
	])

    return (
        <div className="ag-theme-alpine" style={{width: "100%", height: 500}}>
				<AgGridReact
				    columnDefs={columnDefs}
				    rowData={props.rowData}
            defaultColDef={defaultColDef}
            onGridReady={(evt) => evt.api.sizeColumnsToFit()}
                    
				/>
		</div>
    )
} 