import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const products = [
        {
            id: "1",
            name: "Pan",
            price: 100,
            description: "Pan fresco del dia.",
        },
        {
            id: "2",
            name: "Queso",
            price: 200,
            description: "Queso fresco de vacas felices",
        },
        {
            id: "3",
            name: "Mortadela",
            price: 150,
            description: "Mortadela sin igual",
        },
    ];
    const product = products.find((p) => p.id === id);

    if (!product) {
        return (
            <div>
                <h2>Producto no encontrado</h2>
                <button onClick={() => navigate("/products")}>
                    Ir a productos
                </button>
            </div>
        );
    }

    return (
        <div>
            <h2>{product.name}</h2>
            <p>Precio: ${product.price}</p>
            <p>{product.description}</p>
            <hr />
            <button onClick={() => navigate(-1)}>volver</button>
            <button onClick={() => navigate("/")}>Ir a Inicio</button>
            <button onClick={() => navigate("/products")}>
                Ir a productos
            </button>
        </div>
    );
};

export default ProductDetails;
