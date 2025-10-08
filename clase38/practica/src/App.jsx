import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Perfil from "./pages/Perfil";
import NoEncontrado from "./pages/NoEncontrado";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/perfil/:nombreUsuario" element={<Perfil />} />
            <Route path="*" element={<NoEncontrado />} />
        </Routes>
    );
}

export default App;
