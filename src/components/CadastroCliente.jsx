import { Button } from "react-bootstrap"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "./css/client-component.css"

export default function CadastroCliente() {
	let buttonText = "Cadastrar";
	return (
		<div className="div-form">
			<form>
               <div> <label htmlFor="" className="bottom-border"> Pessoa </label>  </div> 
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelNome">Nome:</label> 
                        <input type="text" placeholder="Pedro Henrique" className="form-control" />
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelSobrenome">Sobrenome:</label> 
                        <input type="text" className="form-control" placeholder="Pereira Alburquerque" />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelCPF">CPF:</label> 
                        <input type="text" className="form-control" placeholder="456.487.159-55" />
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelTelefone">Telefone:</label> 
                        <input type="text" className="form-control" placeholder="(32) 9 3456-7849" />
                        </div>
                    </Col>
                </Row>
                <div> <label htmlFor="" className="bottom-border"> Endereço </label>  </div> 
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelRua">Rua:</label> 
                        <input type="text" placeholder="Pedro Henrique" className="form-control" />
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelBairro">Bairro:</label> 
                        <input type="text" className="form-control" placeholder="Pereira Alburquerque" />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelNumero">Número:</label> 
                        <input type="text" className="form-control" placeholder="456.487.159-55" />
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelCidade">Cidade:</label> 
                        <input type="text" className="form-control" placeholder="(32) 9 3456-7849" />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelEstado">Estado:</label> 
                        <input type="text" placeholder="Pedro Henrique" className="form-control" />
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-item"> 
                        <label for className="labelCEP">CEP:</label> 
                        <input type="text" className="form-control" placeholder="Pereira Alburquerque" />
                        </div>
                    </Col>
                </Row>
                <div> <label htmlFor="" className="bottom-border"> Avatar </label>  </div> 
                <Row>
                    <Col sm={6}>
                        <div className="form-item divFile"> 
                        <input type="file" id="file" className="form-control" accept="image/*"/>
                        <label for="file">SELECIONAR IMAGEM
                        <span class="material-icons">account_box</span>
                        </label>
                        </div>
                    </Col>
                </Row>
                <div id="rowBtn">
                    <Button className="btn" >{buttonText}</Button>
                </div>
			</form>
		</div>
	)
}