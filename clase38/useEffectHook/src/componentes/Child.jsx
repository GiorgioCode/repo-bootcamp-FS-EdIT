import React from "react";
import { use } from "react";
import { useState, useEffect } from "react";

const Child = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log("se ha actualizado el componente hijo");
    }, [count]);

    return (
        <div className="child">
            <h2>Componente hijo</h2>
            <h3>{count}</h3>
            <button onClick={() => setCount(count + 1)}>
                {" "}
                Incrementar contador
            </button>
        </div>
    );
};

export default Child;
