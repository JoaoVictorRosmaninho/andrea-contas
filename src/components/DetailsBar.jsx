import './css/logista-component.css';
import Row from 'react-bootstrap/Row';
import { parseCookies } from 'nookies';



function DetailsBar({icon,page_name}) {
    const cookies = parseCookies();
    const paths = {
        "/Logistas/new": "Cadastro de Logista", 
        "/Logistas": "Listar logistas", 
        "/Clientes/new": "Cadastrar Clientes",
        "/Clientes": "Listar Clientes", 
        "/Contas/new": "Cadastro de Contas"
    }
    return (
        <Row>
            <div className="DetailsBar">
                <div className='details-itens'>
                    <span className="material-icons">
                        {icon}
                    </span>
                    <span>{paths[window.location.pathname] || window.location.pathname}</span>
                </div>
                <div className='details-itens'>
                    <span className="material-icons">
                        account_circle
                    </span>
                    <span>{cookies.client}</span>
                </div>
                
            </div>
        </Row>
    );
}

export default DetailsBar;