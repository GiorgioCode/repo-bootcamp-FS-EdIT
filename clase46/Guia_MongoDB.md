# 🌱 Introducción a MongoDB para Principiantes

## 📘 ¿Qué es MongoDB?

**MongoDB** es una base de datos moderna diseñada para guardar y manejar información de manera **simple, rápida y flexible**.

A diferencia de las bases de datos tradicionales (como MySQL o PostgreSQL), MongoDB **no utiliza tablas ni filas**.  
En su lugar, trabaja con **documentos** que se parecen mucho a los **objetos JSON** que se usan en JavaScript.

Por ejemplo, un registro de usuario podría verse así:

```json
{
  "nombre": "Juan",
  "edad": 30,
  "correo": "juan@example.com"
}
```

Estos documentos se agrupan dentro de **colecciones**, y las colecciones viven dentro de una **base de datos**.  
Así:
```
Base de datos → Colección → Documentos
```

---

## 💡 ¿Por qué usar MongoDB?

MongoDB es muy popular entre los desarrolladores porque ofrece muchas ventajas:

| Ventaja | Explicación sencilla |
|----------|----------------------|
| 🧩 **Flexible** | No necesitas definir un esquema fijo antes de guardar datos. Puedes agregar nuevos campos cuando quieras. |
| ⚡ **Rápido** | Está optimizado para lecturas y escrituras rápidas, ideal para aplicaciones web modernas. |
| 🌍 **Escalable** | Puedes distribuir tu base de datos en varios servidores si tu aplicación crece mucho. |
| 🔄 **Altamente disponible** | Si un servidor falla, otro puede seguir funcionando gracias al sistema de réplicas. |
| 🔍 **Consultas potentes** | Puedes filtrar, buscar y analizar datos de muchas formas sin complicarte. |
| 🤝 **Compatible con muchos lenguajes** | Funciona perfectamente con JavaScript, Python, Java, Go y muchos más. |

---

## 🧠 Conceptos básicos que debes entender

| Término | Qué significa | Ejemplo |
|----------|----------------|----------|
| **Base de datos** | Es como una carpeta grande donde guardas tus colecciones. | `miBaseDeDatos` |
| **Colección** | Es como una carpeta dentro de la base de datos que agrupa documentos parecidos. | `usuarios`, `productos`, `pedidos` |
| **Documento** | Es un registro de información. Está escrito en formato JSON. | `{ "nombre": "Ana", "edad": 28 }` |
| **Campo** | Es una parte del documento (clave y valor). | `"edad": 28` |
| **_id** | Es un identificador único que MongoDB asigna automáticamente a cada documento. | `"_id": ObjectId("...")` |

👉 Piensa en MongoDB como un **archivador digital**:  
- El archivador completo es la **base de datos**.  
- Cada cajón es una **colección**.  
- Cada hoja dentro del cajón es un **documento**.

---

## ⚙️ Primeros pasos para usar MongoDB

Hay dos formas principales de empezar:

---

### 🖥️ Opción 1: Instalar MongoDB en tu computadora

1. Visita: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Descarga la versión “Community Edition”.
3. Instálala como cualquier otro programa.
4. Abre la terminal o consola y escribe:
   ```bash
   mongosh
   ```
   Esto abrirá la **Shell de MongoDB**, donde puedes escribir comandos.

---

### ☁️ Opción 2: Usar MongoDB Atlas (en la nube, sin instalar nada)

1. Ingresa en [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Crea una cuenta gratuita.
3. Crea un **Cluster gratuito** (plan "Free Tier").
4. Copia la **URI de conexión**, que se verá así:
   ```
   mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/miBase
   ```
   Este enlace se usa para conectar tu aplicación o herramientas externas.

---

## 🧩 Conectarse a MongoDB

### 🔹 Desde la terminal (Mongo Shell)
1. Abre la terminal y escribe:
   ```bash
   mongosh
   ```
2. Crea o cambia de base de datos:
   ```bash
   use miBaseDeDatos
   ```
3. Crea una colección e inserta un documento:
   ```bash
   db.usuarios.insertOne({ nombre: "Ana", edad: 25 })
   ```
4. Muestra todos los documentos:
   ```bash
   db.usuarios.find()
   ```

---

### 🔹 Desde Node.js (tu aplicación JavaScript)

MongoDB se integra fácilmente con Node.js.

1. Primero, instala el paquete:
   ```bash
   npm install mongodb
   ```

2. Luego crea un archivo, por ejemplo `conexion.js`, con este código:

   ```js
   import { MongoClient } from "mongodb";

   // Dirección de tu base de datos (usa tu propia URI si usas Atlas)
   const uri = "mongodb://localhost:27017";
   const client = new MongoClient(uri);

   async function run() {
     try {
       await client.connect(); // Conexión al servidor
       console.log("✅ Conectado a MongoDB");

       const db = client.db("miBaseDeDatos"); // Crea o selecciona una base
       const coleccion = db.collection("usuarios"); // Crea o accede a una colección

       // Insertamos un documento
       await coleccion.insertOne({ nombre: "Juan", edad: 30 });

       // Mostramos todos los documentos
       const usuarios = await coleccion.find().toArray();
       console.log("👥 Usuarios:", usuarios);
     } finally {
       await client.close(); // Cerramos la conexión
     }
   }

   run().catch(console.dir);
   ```

Este pequeño programa crea una base de datos, guarda un usuario y muestra los datos guardados.

---

## 🧾 Comandos básicos en la consola

| Comando | Qué hace |
|----------|-----------|
| `show dbs` | Muestra todas las bases de datos disponibles. |
| `use miBase` | Cambia o crea una base de datos nueva. |
| `db.createCollection("usuarios")` | Crea una nueva colección. |
| `db.usuarios.insertOne({ nombre: "Ana", edad: 25 })` | Inserta un documento en la colección. |
| `db.usuarios.find()` | Muestra todos los documentos de la colección. |
| `db.usuarios.updateOne({ nombre: "Ana" }, { $set: { edad: 26 } })` | Modifica un campo en un documento. |
| `db.usuarios.deleteOne({ nombre: "Ana" })` | Elimina un documento. |

---

## 💬 Consejos y buenas prácticas

1. ✍️ **Organiza tus datos**: aunque MongoDB no exige estructura, es recomendable mantener una lógica común entre tus documentos.  
2. 🔍 **Crea índices**: ayudan a que las búsquedas sean mucho más rápidas.  
3. 🧱 **Evita documentos muy grandes**: MongoDB tiene un límite de 16 MB por documento.  
4. 🧮 **Usa “agregations”** para realizar cálculos y resúmenes complejos.  
5. 💾 **Haz respaldos** periódicos, sobre todo si trabajas con datos importantes.

---

## 🚀 Qué aprender después

- **Mongoose**: una librería de Node.js que facilita el trabajo con MongoDB.  
- **Aggregation Framework**: para hacer análisis de datos dentro de MongoDB.  
- **Autenticación y roles**: controla quién puede acceder y modificar los datos.  
- **Integración con APIs REST**: conecta tu base de datos con un backend en Express o Nest.js.

---

## 📚 Recursos recomendados

- 📖 [Documentación oficial de MongoDB](https://www.mongodb.com/docs/)
- 🎓 [Cursos gratuitos en MongoDB University](https://learn.mongodb.com/)
- 🧪 [MongoDB Playground en línea](https://www.mongodb.com/products/tools/compass)
- 💬 [Comunidad de desarrolladores MongoDB](https://community.mongodb.com/)

---

## 🧭 En resumen

> MongoDB es una base de datos moderna, flexible y muy fácil de usar.  
> Ideal para principiantes que quieren empezar a construir aplicaciones reales sin complicarse con estructuras rígidas.  
> Con unos pocos comandos ya puedes guardar, buscar y modificar información como todo un profesional.

---
