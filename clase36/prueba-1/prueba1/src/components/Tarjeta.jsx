import React from "react";

const Tarjeta = ({ title, children }) => {
    return (
        <div
            style={{
                border: "1px solid",
                padding: "1rem",
                borderRadius: "10px",
                marginBottom: "1rem",
            }}
        >
            {title && <h3>{title}</h3>}
            <div>{children}</div>
        </div>
    );
};

export default Tarjeta;
