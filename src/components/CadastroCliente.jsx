import { Button } from "react-bootstrap"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "./css/component.css"

export default function CadastroCliente() {
	let buttonText = "Cadastrar";
	return (
		<div className="div-form">
			<form>
                Pessoa
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for>Nome:</label> 
                        <input type="text" placeholder="Pedro Henrique" className="form-control" />
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for>Sobrenome:</label> 
                        <input type="text" className="form-control" placeholder="Pereira Alburquerque" />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for>CPF:</label> 
                        <input type="text" className="form-control" placeholder="456.487.159-55" />
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for>Telefone:</label> 
                        <input type="text" className="form-control" placeholder="(32) 9 3456-7849" />
                        </div>
                    </Col>
                </Row>
                Endereço
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for>Rua:</label> 
                        <input type="text" placeholder="Pedro Henrique" className="form-control" />
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for>Bairro:</label> 
                        <input type="text" className="form-control" placeholder="Pereira Alburquerque" />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for>Número:</label> 
                        <input type="text" className="form-control" placeholder="456.487.159-55" />
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for>Cidade:</label> 
                        <input type="text" className="form-control" placeholder="(32) 9 3456-7849" />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for>Estado:</label> 
                        <input type="text" placeholder="Pedro Henrique" className="form-control" />
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for>CEP:</label> 
                        <input type="text" className="form-control" placeholder="Pereira Alburquerque" />
                        </div>
                    </Col>
                </Row>
                Avatar
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <input type="file" className="form-control" />
                        </div>
                    </Col>
                </Row>
				<Button className="btn">{buttonText}</Button>
			</form>
		</div>
	)
}