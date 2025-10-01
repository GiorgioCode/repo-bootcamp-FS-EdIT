import React from "react";

const SaludoDefecto = (props) => {
    const nombre = props.nombre ?? "amigote";
    return <p>Hola, {nombre}</p>;
};

export default SaludoDefecto;
