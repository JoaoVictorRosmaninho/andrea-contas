import { Button } from "react-bootstrap"
import "./css/logista-component.css"

export default function CadastroLogista() {
	let buttonText = "Cadastrar";
	return (
		<div className="div-form">
			<form>
				<div className="form-item"> 
					<label for>Username:</label> 
					<input type="text" placeholder="Entre com o novo username" className="form-control" />
				</div>
				<div className="form-item position-relative align-right"> 
					<label for>Senha:</label> 
					<input type="text" className="form-control" placeholder="Entre a nova Senha" />
				</div>
				<div className="form-item position-relative align-right-selector"> 
					<label for>Perfil:</label> 
					<select className="form-control">
						<option value="">Administrador</option>
						<option value="">Logista</option>
					</select>
				</div>
				<Button className="btn" variant="dark">{buttonText}</Button>
			</form>
		</div>
	)
}