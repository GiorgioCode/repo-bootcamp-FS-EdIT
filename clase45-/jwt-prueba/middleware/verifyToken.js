// Importamos jsonwebtoken para poder verificar tokens
const jwt = require("jsonwebtoken");

// Middleware que verifica el token enviado en el header Authorization
module.exports = function (req, res, next) {
    // Recuperamos el header 'authorization' (forma esperada: 'Bearer <token>')
    const authHeader = req.headers["authorization"];

    // Si no hay header devolvemos 401 (no autorizado)
    if (!authHeader)
        return res.status(401).json({ message: "No token provided" });

    // El header contiene 'Bearer <token>', separamos por espacio y tomamos la segunda parte
    const parts = authHeader.split(" ");

    // Compruebo que haya dos partes y que la primera parte sea 'Bearer'
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res
            .status(401)
            .json({ message: "Invalid authorization header format" });
    }

    const token = parts[1];

    // Verificamos el token con la clave secreta que definimos en .env
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        // Si hubo un error (token inválido o expirado) devolvemos 401
        if (err) return res.status(401).json({ message: "Invalid token" });

        // Guardamos los datos decodificados en la petición para que las rutas puedan usarlos
        req.user = decoded;

        // Llamamos a next() para que la petición continúe al siguiente middleware / ruta
        next();
    });
};
