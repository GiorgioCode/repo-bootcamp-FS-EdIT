// ========================================
// IMPORTACIONES
// ========================================

// Importar hooks de React: useEffect para ejecutar código al montar el componente,
// y useState para manejar el estado local
import { useEffect, useState } from "react";

// ========================================
// COMPONENTE: VERIFIED
// ========================================

/**
 * Componente que muestra el resultado de la verificación del email
 * Lee los parámetros de la URL para determinar qué mensaje mostrar
 */
export default function Verified() {
    // ========================================
    // ESTADOS DEL COMPONENTE
    // ========================================

    // Estado para almacenar el estado de verificación (success, expired, invalid)
    const [status, setStatus] = useState(null);

    // Estado para almacenar el email verificado (solo viene en caso de éxito)
    const [email, setEmail] = useState(null);

    // ========================================
    // EFECTO: LEER PARÁMETROS DE LA URL
    // ========================================

    // useEffect se ejecuta una vez cuando el componente se monta
    useEffect(() => {
        // Crear un objeto URLSearchParams con los parámetros de la URL actual
        // Ejemplo: si la URL es "/verified?status=success&email=test@test.com"
        // entonces params contendrá esos valores
        const params = new URLSearchParams(window.location.search);

        // Obtener el valor del parámetro "status" y guardarlo en el estado
        setStatus(params.get("status"));

        // Obtener el valor del parámetro "email" y guardarlo en el estado
        setEmail(params.get("email"));
    }, []); // Array vacío significa que se ejecuta solo una vez al montar

    // ========================================
    // RENDERIZADO CONDICIONAL
    // ========================================

    // Si aún no hay status, no renderizar nada (evita flash de contenido)
    if (!status) return null;

    // CASO 1: Verificación exitosa
    if (status === "success") {
        return (
            <div style={{ maxWidth: 720, margin: "2rem auto" }}>
                {/* Título con emoji de éxito */}
                <h1>¡Verificación exitosa! ✅</h1>

                {/* Mostrar el email que fue verificado */}
                <p>
                    Correo verificado: <strong>{email}</strong>
                </p>
            </div>
        );
    }

    // CASO 2: Enlace expirado
    if (status === "expired") {
        return (
            <div style={{ maxWidth: 720, margin: "2rem auto" }}>
                {/* Título con emoji de reloj */}
                <h1>Enlace expirado ⌛</h1>

                {/* Mensaje informando que debe solicitar uno nuevo */}
                <p>Solicitá uno nuevo desde la página principal.</p>
            </div>
        );
    }

    // CASO 3: Enlace inválido (cualquier otro status o token no encontrado)
    return (
        <div style={{ maxWidth: 720, margin: "2rem auto" }}>
            {/* Título con emoji de error */}
            <h1>Enlace inválido ❌</h1>

            {/* Mensaje indicando que el enlace no es válido */}
            <p>
                Verificá que hayas usado el enlace correcto o solicitá uno
                nuevo.
            </p>
        </div>
    );
}
