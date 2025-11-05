# Explicación del campo `iat` en JWT

## 🧩 ¿Qué significa `iat`?

El campo `iat` dentro de un token **JWT** significa **"issued at"**, que en español se traduce como **"emitido en"**.

Representa el **momento exacto** en que el token fue generado. Su valor es un número entero que indica la cantidad de **segundos transcurridos desde el 1 de enero de 1970 (época Unix o UNIX timestamp)**.

---

## 📘 Ejemplo de payload

Cuando decodificás un JWT (por ejemplo en [https://jwt.io](https://jwt.io)), podés ver algo como esto:

```json
{
  "id": 1,
  "email": "alumno@example.com",
  "iat": 1730287200,
  "exp": 1730290800
}
```

- `iat`: **1730287200** → fecha/hora en que el token fue emitido.
- `exp`: **1730290800** → fecha/hora en que el token expira (en este caso, una hora después de `iat`).

---

## ⚙️ Cómo se genera `iat`

Cuando generás un token con `jsonwebtoken` en Node.js, el campo `iat` se agrega **automáticamente**.

```javascript
const jwt = require('jsonwebtoken');

const payload = { id: 1, email: 'alumno@example.com' };
const token = jwt.sign(payload, 'mi_clave_secreta', { expiresIn: '1h' });
```

El token generado contendrá internamente un campo `iat` que indica la hora exacta de emisión.

---

## 🔍 ¿Para qué sirve `iat`?

1. **Auditoría y trazabilidad:** Permite saber cuándo fue emitido un token, útil para logs o diagnósticos.
2. **Control de seguridad:** Puede usarse para invalidar tokens emitidos antes de cierto evento (por ejemplo, un cambio de contraseña).
3. **Complemento de `exp`:** Ayuda a calcular cuánto tiempo de vida le queda al token.

---

## 🧠 Ejemplo práctico (verificación de `iat`)

Supongamos que querés bloquear todos los tokens emitidos antes de un cambio de contraseña:

```javascript
function isTokenStillValid(decodedToken, lastPasswordChangeTimestamp) {
  // Si el token fue emitido antes del último cambio de contraseña, es inválido
  return decodedToken.iat * 1000 > lastPasswordChangeTimestamp;
}
```

---

## ⚠️ Consideraciones

- El valor de `iat` está en **segundos**, pero en JavaScript las fechas (`Date.now()`) están en **milisegundos**. Por eso a menudo se multiplica o divide por 1000.
- No se debe modificar manualmente el `iat`; la librería `jsonwebtoken` lo maneja de forma interna y automática.

---

## ✅ Resumen

| Campo | Significado | Tipo | Ejemplo |
|--------|--------------|------|----------|
| `iat` | Fecha/hora en que se emitió el token | número (segundos desde 1970) | 1730287200 |
| `exp` | Fecha/hora en que expira el token | número (segundos desde 1970) | 1730290800 |

**En resumen:** `iat` es el sello temporal de emisión del JWT, útil para control y seguridad, y siempre se genera automáticamente al crear el token.