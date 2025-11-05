# 📘 GUÍA INTRODUCTORIA: USO DE MONGOOSE CON MONGODB EN NODE.JS

---

## 🧠 Objetivo

Esta guía tiene como propósito ayudarte a **comprender los fundamentos de Mongoose**, una librería de Node.js que facilita la **interacción con bases de datos MongoDB** mediante un sistema de **modelos y esquemas**.  
No necesitas experiencia previa en bases de datos NoSQL, pero sí una idea general de cómo funciona Node.js.

---

## 1️⃣ ¿Qué es Mongoose?

**Mongoose** es una **librería ODM (Object Data Modeling)** para MongoDB y Node.js.  
Su función principal es **modelar los datos** que guardamos en MongoDB, dándonos herramientas para:

-   Definir **estructuras de datos (esquemas)**.
-   Validar y transformar información.
-   Ejecutar consultas fácilmente (CRUD).
-   Evitar errores de tipo o inconsistencias.

> 📦 Mongoose convierte el caos de los documentos JSON en algo estructurado, como si tuvieras una “tabla” de SQL, pero flexible.

---

## 2️⃣ Instalación y configuración básica

Antes de comenzar, asegúrate de tener **Node.js y MongoDB** instalados.  
Luego, crea un nuevo proyecto.

```bash
mkdir guia-mongoose
cd guia-mongoose
npm init -y
npm install mongoose
```

Crea un archivo llamado `index.js` en la raíz del proyecto.

---

## 3️⃣ Conectarse a MongoDB

```js
// index.js
const mongoose = require("mongoose");
mongoose
    .connect("mongodb://localhost:27017/guia_mongoose")
    .then(() => console.log("✅ Conectado a MongoDB"))
    .catch((err) => console.error("❌ Error de conexión:", err));
```

---

## 4️⃣ Crear un esquema y modelo

```js
const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    edad: { type: Number, min: 0 },
    correo: { type: String, unique: true },
    fechaRegistro: { type: Date, default: Date.now },
});
const Usuario = mongoose.model("Usuario", userSchema);
```

---

## 5️⃣ Insertar (CREATE)

```js
const nuevoUsuario = new Usuario({
    nombre: "Juan Pérez",
    edad: 25,
    correo: "juanperez@mail.com",
});
nuevoUsuario
    .save()
    .then(() => console.log("✅ Usuario guardado correctamente"))
    .catch((err) => console.error("❌ Error al guardar:", err));
```

---

## 6️⃣ Leer (READ)

```js
Usuario.find().then((usuarios) => console.log("📋 Usuarios:", usuarios));
Usuario.findOne({ nombre: "Juan Pérez" }).then((u) =>
    console.log("🔎 Usuario encontrado:", u)
);
```

---

## 7️⃣ Actualizar (UPDATE)

```js
Usuario.updateOne({ nombre: "Juan Pérez" }, { edad: 30 })
    .then(() => console.log("✏️ Usuario actualizado"))
    .catch((err) => console.error(err));
```

---

## 8️⃣ Eliminar (DELETE)

```js
Usuario.deleteOne({ nombre: "Juan Pérez" })
    .then(() => console.log("🗑️ Usuario eliminado"))
    .catch((err) => console.error(err));
```

---

## 9️⃣ Validaciones

```js
const usuarioInvalido = new Usuario({ edad: 20 });
usuarioInvalido
    .save()
    .catch((err) => console.error("⚠️ Error de validación:", err.message));
```

---

## 🔟 Buenas prácticas

1. Usa **nombres de colección en singular**.
2. Define siempre **validaciones**.
3. Usa **async/await**.
4. Separa lógica en carpetas `models/`, `controllers/`, `routes/`.
5. Cierra la conexión al terminar.

```js
mongoose.connection.close();
```

---

## 🧩 Ejemplo final completo

```js
const mongoose = require("mongoose");

async function main() {
    await mongoose.connect("mongodb://localhost:27017/guia_mongoose");
    console.log("✅ Conectado a MongoDB");

    const userSchema = new mongoose.Schema({
        nombre: { type: String, required: true },
        edad: { type: Number, min: 0 },
        correo: { type: String, unique: true },
        fechaRegistro: { type: Date, default: Date.now },
    });

    const Usuario = mongoose.model("Usuario", userSchema);

    const nuevo = new Usuario({
        nombre: "Ana Gómez",
        edad: 22,
        correo: "ana@mail.com",
    });
    await nuevo.save();
    console.log("📥 Usuario guardado.");

    const lista = await Usuario.find();
    console.log("📋 Lista de usuarios:", lista);

    await Usuario.updateOne({ nombre: "Ana Gómez" }, { edad: 23 });
    console.log("✏️ Usuario actualizado.");

    await Usuario.deleteOne({ nombre: "Ana Gómez" });
    console.log("🗑️ Usuario eliminado.");

    await mongoose.connection.close();
}

main().catch((err) => console.error("❌ Error:", err));
```

---

## 🎯 Conclusión

Mongoose simplifica el trabajo con MongoDB, ofreciendo una forma estructurada y segura de manejar datos.  
Con estas bases, puedes construir **APIs completas** o **aplicaciones backend** que interactúen eficientemente con tu base de datos NoSQL.
