import { Button } from "react-bootstrap";
import DetailsBar from './DetailsBar';
import "./css/logista-component.css"

export default function CadastroLogista() {
	let buttonText = "Cadastrar";
	return (
		<div className="div-form">
			<DetailsBar icon="edit_note" page_name="Cadastro de Lojista" user_name="Gustavo Goulart" />
			<form>
				<div className="form-item"> 
					<label for>Username:</label> 
					<input type="text" placeholder="Entre com o novo username" className="form-control" />
				</div>
				<div className="form-item"> 
					<label for>Senha:</label> 
					<input type="text" className="form-control" placeholder="Entre a nova Senha" />
				</div>
				<div className="form-item"> 
					<label for>Perfil:</label> 
					<select className="form-control">
						<option value="">Administrador</option>
						<option value="">Logista</option>
					</select>
				</div>
				<div id="rowBtn">
					<Button className="btn" variant="dark">{buttonText}</Button>
				</div>
			</form>
		</div>
	)
}