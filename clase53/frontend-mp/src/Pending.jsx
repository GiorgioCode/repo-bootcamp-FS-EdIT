import "./App.css";

export default function Pending() {
    return (
        <div className="container">
            <div className="header">
                <h1>⏳ Pago Pendiente</h1>
                <p>Tu pago está siendo procesado. Recibirás una confirmación por email cuando se complete.</p>
                <br />
                <a href="/" className="buy-button" style={{ textDecoration: 'none' }}>
                    Volver a la tienda
                </a>
            </div>
        </div>
    );
}
