import "./App.css";

export default function Success() {
    return (
        <div className="container">
            <div className="header">
                <h1>✅ ¡Pago Exitoso!</h1>
                <p>Tu compra se ha procesado correctamente. Recibirás un email de confirmación.</p>
                <br />
                <a href="/" className="buy-button" style={{ textDecoration: 'none' }}>
                    Volver a la tienda
                </a>
            </div>
        </div>
    );
}
