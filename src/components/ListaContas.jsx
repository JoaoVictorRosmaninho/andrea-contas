import React from "react";
import MyNavBar from "./NavBar";
import Checkbox from "./subcomponents/Checkbox";
import FindByCliente from "./subcomponents/FindByCliente";
import FindByPeriodo from "./subcomponents/FindByPeriodo";
import DetailsBar from "./DetailsBar";

export default function ListaContas() {
    const [type, setType] = React.useState("");
    return (
        <div>
            <MyNavBar />
            <DetailsBar />
            <Checkbox type={type} setType={setType}/>
            {
                type === "cliente" && 
                <FindByCliente />
            }
            {
                type == "periodo" && 
                <FindByPeriodo/>
            }
        </div>
    )
}