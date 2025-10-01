import React from "react";

const SaludoPorDefecto = ({ nombre = "amigo" }) => {
    return <p>Hola, {nombre}</p>;
};

export default SaludoPorDefecto;
