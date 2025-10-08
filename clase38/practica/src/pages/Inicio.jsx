import React from "react";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
    const navigate = useNavigate();

    const IrAlPerfil = () => {
        navigate("/perfil/Jorge");
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Pagina de inicio</h1>
            <button onClick={IrAlPerfil}>Ir a mi perfil</button>
        </div>
    );
};

export default Inicio;
