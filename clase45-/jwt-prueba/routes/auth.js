// Importamos express para crear un router
const express = require("express");
const router = express.Router();

// Importamos bcrypt para encriptar contraseñas y jsonwebtoken para crear tokens
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Array que simula una base de datos de usuarios en memoria
// Cada usuario tendrá: id, email, passwordHash
const users = [];

// Ruta: POST /api/auth/register
// Registra un usuario nuevo (recibe { email, password })
router.post("/register", async (req, res) => {
    try {
        // Leemos email y password desde el body de la petición
        const { email, password } = req.body;

        // Validación básica: comprobar que haya email y password
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }

        // Verificamos si el usuario ya existe en el array
        const existing = users.find((u) => u.email === email);
        if (existing) {
            return res.status(400).json({ message: "User already exists" });
        }

        // GENERAMOS EL HASH de la contraseña usando bcrypt
        // parseInt(process.env.BCRYPT_SALT_ROUNDS) convierte la variable de entorno a número
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;

        // bcrypt.hash devuelve una promesa, por eso usamos await
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Creamos el usuario y lo guardamos en el array
        const user = { id: users.length + 1, email, passwordHash };
        users.push(user);

        // Respondemos con éxito (sin devolver la contraseña ni el hash)
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        // En caso de error devolvemos 500
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Ruta: POST /api/auth/login
// Inicia sesión y devuelve un JWT si las credenciales son correctas
router.post("/login", async (req, res) => {
    try {
        // Leemos email y password del body
        const { email, password } = req.body;

        // Validación básica
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }

        // Buscamos el usuario por email
        const user = users.find((u) => u.email === email);
        if (!user) {
            // Para no revelar si el email existe, podemos devolver un mensaje genérico
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Comparamos la contraseña enviada con el hash almacenado
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Si es correcta, generamos un JWT. En el payload podemos guardar información mínima
        const payload = {
            id: user.id,
            email: user.email,
        };

        // Firmamos el token con nuestra clave secreta y tiempo de expiración desde .env
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "1h",
        });

        // Enviamos el token al cliente
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
