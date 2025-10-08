import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const Perfil = () => {
    const { nombreUsuario } = useParams();
    const navigate = useNavigate();
    return (
        <div style={{ textAlign: "center" }}>
            <h1>Este es el perfil de {nombreUsuario}</h1>
            <button onClick={() => navigate("/")}>Ir a inicio</button>
            <button onClick={() => navigate(-1)}>
                Ir a la pagina anterior
            </button>
        </div>
    );
};

export default Perfil;
