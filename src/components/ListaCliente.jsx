import Table from 'react-bootstrap/Table';
import "./css/component.css"

export default function ListaCliente() {
	return (
		<Table striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Cliente</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>btn1 btn2</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>btn1 btn2</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                    <td>btn1 btn2</td>
                </tr>
            </tbody>
            </Table>
	);
}