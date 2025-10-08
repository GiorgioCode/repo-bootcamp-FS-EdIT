import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
    const navigate = useNavigate();

    const products = [
        { id: "1", name: "Pan", price: 100 },
        { id: "2", name: "Queso", price: 200 },
        { id: "3", name: "Mortadela", price: 150 },
    ];

    return (
        <div>
            <h2>Productos</h2>
            <ul>
                {products.map((p) => (
                    <li key={p.id} style={{ marginBottom: 8 }}>
                        <Link to={`/products/${p.id}`}>
                            {p.name} - ${p.price}
                        </Link>
                        <button
                            onClick={() => navigate(`/products/${p.id}`)}
                            style={{ marginLeft: 8 }}
                        >
                            Ver
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate("/")} style={{ marginTop: 12 }}>
                Volver al inicio
            </button>
        </div>
    );
};

export default Products;
