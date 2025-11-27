import "./App.css";

export default function Failure() {
    return (
        <div className="container">
            <div className="header">
                <h1>❌ Pago Rechazado</h1>
                <p>No se pudo procesar el pago. Por favor, intenta nuevamente o usa otro método de pago.</p>
                <br />
                <a href="/" className="buy-button" style={{ textDecoration: 'none' }}>
                    Volver a la tienda
                </a>
            </div>
        </div>
    );
}
