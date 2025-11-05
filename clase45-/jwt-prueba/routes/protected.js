// Importamos express para crear un router
const express = require("express");
const router = express.Router();

// Importamos el middleware que verifica tokens
const verifyToken = require("../middleware/verifyToken");

// Ruta protegida: GET /api/protected/secret
// Solo accesible si se envía un JWT válido en el header Authorization
router.get("/secret", verifyToken, (req, res) => {
    // req.user fue definido por el middleware verifyToken (contiene info del token)
    res.json({ message: "Este es el contenido secreto", user: req.user });
});

module.exports = router;
