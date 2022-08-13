import './css/logista-component.css';
import Row from 'react-bootstrap/Row';
function DetailsBar({icon,page_name,user_name}) {
    return (
        <Row>
            <div className="DetailsBar">
                <div className='details-itens'>
                    <span className="material-icons">
                        {icon}
                    </span>
                    <span>{page_name}</span>
                </div>
                <div className='details-itens'>
                    <span>Lojista</span>
                    <span className="material-icons">
                        account_circle
                    </span>
                    <span>{user_name}</span>
                </div>
                
            </div>
        </Row>
    );
}

export default DetailsBar;