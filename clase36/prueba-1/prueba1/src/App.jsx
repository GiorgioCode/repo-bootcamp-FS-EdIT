import "./App.css";
import Saludo from "./components/Saludo";
import SaludoPorDefecto from "./components/SaludoPorDefecto";
import SaludoDefecto from "./components/SaludoDefecto";
import Tarjeta from "./components/Tarjeta";
import Boton from "./components/Boton";
function App() {
    return (
        <div style={{ padding: "1rem" }}>
            <h1>Props basicas</h1>
            <Saludo nombre={"jorge"} />
            <Saludo nombre={"maria"} />
            <Saludo nombre={10} />
            <SaludoPorDefecto />
            <SaludoPorDefecto nombre={"Mario"} />
            <SaludoDefecto />
            <SaludoDefecto nombre={"juan"} />
            <Tarjeta title="Presentacion">
                <p>
                    Este es un parrafo dentro de la tarjeta pasado como
                    prop.child
                </p>
                <Saludo nombre="Ana"></Saludo>
            </Tarjeta>
            <Tarjeta>
                <p>Tarjeta sin titulo pero con contenido</p>
            </Tarjeta>
            <Boton
                onClick={() => alert("Hiciste Click")}
                etiqueta="Aviso con alert"
            />
            <Boton
                onClick={() => console.log("Se hizo click en el boton")}
                etiqueta="Aviso en consola"
            />
        </div>
    );
}

export default App;
