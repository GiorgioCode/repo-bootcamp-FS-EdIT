import React from "react";

const Boton = ({ onClick, etiqueta = "Pulsar" }) => {
    return <button onClick={onClick}>{etiqueta}</button>;
};

export default Boton;
