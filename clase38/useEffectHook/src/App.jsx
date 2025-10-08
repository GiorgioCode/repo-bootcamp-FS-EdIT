import { useState } from "react";
import Child from "./componentes/Child";
import "./App.css";

function App() {
    const [showChild, setShowChild] = useState(true);

    return (
        <div>
            <h1>useEffect() - Ciclo de vida de Componentes</h1>
            <button onClick={() => setShowChild(!showChild)}>
                Toggle Child
            </button>
            {showChild && <Child />}
        </div>
    );
}

export default App;
