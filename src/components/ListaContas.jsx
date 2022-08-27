import React from "react";
import MyNavBar from "./NavBar";
import Checkbox from "./subcomponents/Checkbox";

export default function ListaContas() {
    const [type, setType] = React.useState("");
    return (
        <div>
            <MyNavBar />
            <Checkbox type={type} setType={setType}/>
            {
                type === "cliente" && 
                <span>cliente</span>
            }
            {
                type == "periodo" && 
                <span>periodo</span>
            }
        </div>
    )
}