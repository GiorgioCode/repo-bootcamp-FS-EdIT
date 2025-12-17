# Guía práctica: Cómo armar paso a paso un entorno de trabajo con TypeScript

> **Objetivo:** Esta guía te llevará desde cero hasta un entorno funcional de desarrollo con TypeScript (TS), explicando comandos para iniciar proyectos, configurar `tsconfig.json`, ejecutar la transpilación y buenas prácticas para desarrollo y producción.

---

## 1. Introducción — ¿Qué es TypeScript y cuál es su relación con JavaScript?

TypeScript es un _superset_ de JavaScript que añade tipos estáticos opcionales y algunas características modernas del lenguaje. Todo archivo `.ts` (TypeScript) se transpila a JavaScript compatible con los entornos objetivo (navegador, Node.js, bundlers).

-   **Relación con JS:** cualquier código JavaScript válido también es código TypeScript válido (salvo excepciones menores). TypeScript realiza un **chequeo de tipos estático** en tiempo de compilación para detectar errores antes de ejecutar el programa, pero al final genera JavaScript que se ejecuta exactamente igual que si hubieras escrito JS directo.
-   **Beneficios:** autocompletado y mejores IDE hints (especialmente en VS Code), detección temprana de errores, refactorizaciones más seguras, y la posibilidad de escribir API más robustas.

---

## 2. Requisitos previos

-   Node.js (versión LTS recomendada). Comprueba la versión con:

```bash
node -v
npm -v
```

-   Un editor de código: **Visual Studio Code** es el más popular para TS por su integración y extensiones.

---

## 3. Crear el proyecto y dependencias básicas

Abre una terminal en la carpeta donde quieras crear el proyecto.

1. Inicializar `package.json`:

```bash
mkdir mi-proyecto-ts
cd mi-proyecto-ts
npm init -y
```

2. Instalar TypeScript y herramientas de desarrollo (localmente):

```bash
npm install --save-dev typescript
```

3. Opcionalmente instala `ts-node` para ejecutar TypeScript directamente en Node durante desarrollo (no hace un JavaScript persistente):

```bash
npm install --save-dev ts-node
```

4. (Recomendado) Instalar tipos para Node y otras librerías si vas a usarlas:

```bash
npm install --save-dev @types/node
# ejemplo si usas express:
# npm install express
# npm install --save-dev @types/express
```

---

## 4. Inicializar `tsconfig.json`

`tsconfig.json` controla cómo se transpila TS a JS. Crea uno inicial con:

```bash
npx tsc --init
```

Esto generará un `tsconfig.json` con muchas opciones comentadas. A continuación una configuración mínima y práctica para proyectos Node modernos:

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "outDir": "dist",
        "rootDir": "src",
        "strict": true,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "skipLibCheck": true,
        "sourceMap": true,
        "incremental": true
    },
    "include": ["src"],
    "exclude": ["node_modules", "dist"]
}
```

**Explicación rápida de opciones clave:**

-   `target`: versión de JS objetivo. ES2020 es buena para Node 14+ y navegadores modernos.
-   `module`: tipo de módulos (commonjs para Node, `esnext` para ESM/bundlers).
-   `outDir`: carpeta donde se colocará JS generado.
-   `rootDir`: carpeta fuente (por convención `src`).
-   `strict`: activa un conjunto de comprobaciones estrictas (recomendado).
-   `esModuleInterop`: facilita importaciones entre CommonJS y ESModule.
-   `sourceMap`: útil para depurar TS en el navegador o en Node con herramientas que soportan sourcemaps.
-   `incremental`: compilar más rápido guardando información incremental.

---

## 5. Estructura de proyecto recomendada

```
mi-proyecto-ts/
├─ node_modules/
├─ src/
│  ├─ index.ts
│  └─ ...
├─ dist/
├─ package.json
├─ tsconfig.json
└─ .gitignore
```

Ejemplo de `src/index.ts`:

```ts
function saludar(nombre: string) {
    return `Hola, ${nombre}`;
}

console.log(saludar("Mundo"));
```

---

## 6. Scripts útiles en `package.json`

Agrega scripts para compilar, ejecutar en desarrollo y limpiar:

```json
"scripts": {
  "build": "tsc",
  "build:watch": "tsc -w",
  "start": "node dist/index.js",
  "dev": "ts-node src/index.ts",
  "clean": "rm -rf dist"
}
```

-   `npm run build` — ejecuta el compilador TS y genera JS en `dist/`.
-   `npm run build:watch` — recompila automáticamente al cambiar archivos.
-   `npm run dev` — ejecuta con `ts-node` (útil durante desarrollo rápido).

> Nota Windows: para `clean` usa una solución cross-platform como `rimraf` si quieres compatibilidad (`npm install --save-dev rimraf`) y luego `"clean": "rimraf dist"`.

---

## 7. Flujos de trabajo comunes

### 7.1 Desarrollo rápido (ts-node)

```bash
npm run dev
```

`ts-node` transpila y ejecuta en memoria. Es lento para producción pero muy cómodo para editar y probar rápidamente.

### 7.2 Desarrollo con compilación incremental y reinicio automático

Puedes usar `tsc --watch` para compilar y luego usar `nodemon` para reiniciar Node al detectar cambios en `dist`.

Instala:

```bash
npm install --save-dev nodemon
```

Script ejemplo:

```json
"scripts": {
  "watch:build": "tsc -w",
  "watch:start": "nodemon --watch dist --exec node dist/index.js",
  "dev:full": "concurrently \"npm:watch:build\" \"npm:watch:start\""
}
```

`concurrently` permite correr varios scripts; instálalo si lo usas: `npm install --save-dev concurrently`.

### 7.3 Producción (compilar y ejecutar)

```bash
npm run build
npm start
```

Esto asegura que `dist/` contiene JS listo para producción.

---

## 8. Integración con bundlers / frontend (Vite / Webpack / esbuild)

Para aplicaciones frontend se suele usar Vite o Webpack para bundling y soporte HMR. Vite tiene soporte nativo para TypeScript (sin necesidad de configuración adicional para proyectos simples).

Ejemplo rápido con Vite + React:

```bash
npm create vite@latest mi-app -- --template react-ts
cd mi-app
npm install
npm run dev
```

Vite se encarga de transpilar TypeScript durante el desarrollo; sigue siendo buena práctica tener `tsconfig.json` para IDE y builds.

---

## 9. Linter y formateador

Para mantener calidad de código instala ESLint y Prettier con plugins para TypeScript.

Instalación básica:

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier eslint-plugin-prettier
```

Ejemplo minimal `.eslintrc.json`:

```json
{
    "parser": "@typescript-eslint/parser",
    "parserOptions": { "ecmaVersion": 2020, "sourceType": "module" },
    "plugins": ["@typescript-eslint"],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ]
}
```

Agrega scripts:

```json
"lint": "eslint 'src/**/*.{ts,tsx}' --fix",
"format": "prettier --write 'src/**/*.{ts,tsx,js,json,md}'"
```

---

## 10. Tipos, declaraciones y paquetes sin tipos

-   Muchas librerías vienen con tipos integrados. Si no, instala `@types/paquete` (por ejemplo `@types/express`).
-   Si una librería no tiene tipos, puedes crear módulos de declaración mínimos: `src/types/mi-lib.d.ts` con `declare module 'mi-lib'`.

---

## 11. Depuración (debugging)

En **VS Code** crea una configuración de lanzamiento (`.vscode/launch.json`) para ejecutar directamente el código TS con sourcemaps o el código compilado en `dist`.

Ejemplo para depurar código compilado:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "pwa-node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/dist/index.js",
            "preLaunchTask": "tsc: build - tsconfig.json",
            "cwd": "${workspaceFolder}"
        }
    ]
}
```

También puedes depurar con `ts-node` y la configuración apropiada.

---

## 12. Buenas prácticas y consejos

-   Usa `strict` en `tsconfig.json` para atrapar más errores temprano.
-   Prefiere tipos explícitos en la API pública de tus módulos y funciones.
-   Mantén `rootDir: src` y `outDir: dist` claros para evitar mezclar código fuente y compilado.
-   Usa `skipLibCheck` para acelerar compilaciones si dependencias vienen con tipos problemáticos.
-   Aprovecha `paths` y `baseUrl` en `tsconfig` para rutas de import limpias (por ejemplo `@/utils`).

Ejemplo mínimo para `paths`:

```json
"compilerOptions": {
  "baseUrl": "./",
  "paths": {
    "@/*": ["src/*"]
  }
}
```

---

## 13. Comandos clave resumidos

-   `npx tsc --init` — inicializa `tsconfig.json`.
-   `npm install --save-dev typescript` — instalar compilador.
-   `npm run build` — compila TS -> JS (si definiste el script `build: "tsc"`).
-   `npx tsc -w` o `npm run build:watch` — modo watch.
-   `npm run dev` — ejecutar con `ts-node` (si definiste).
-   `npm run lint` / `npm run format` — calidad de código.

---

## 14. Ejemplo práctico completo (paso a paso rápido)

1. Crear y entrar al proyecto:

```bash
mkdir proyecto-ejemplo
cd proyecto-ejemplo
npm init -y
```

2. Instalar dependencias básicas:

```bash
npm install --save-dev typescript ts-node @types/node
```

3. Crear estructura y archivo inicial:

```bash
mkdir src
echo "console.log('Hola TypeScript')" > src/index.ts
```

4. Inicializar `tsconfig` y ajustar (si hace falta):

```bash
npx tsc --init
# editar tsconfig.json -> establecer rootDir: src, outDir: dist, strict: true
```

5. Añadir scripts en `package.json`:

```json
"scripts": {
  "build": "tsc",
  "dev": "ts-node src/index.ts"
}
```

6. Ejecutar en desarrollo:

```bash
npm run dev
```

7. Compilar para producción:

```bash
npm run build
node dist/index.js
```

---

## 15. Recursos recomendados

-   Documentación oficial de TypeScript (busca "TypeScript handbook" en la web) — excelente para profundizar en tipos avanzados y arquitectura.
-   VS Code + extensión oficial de TypeScript para mejor experiencia.

---

## 16. Preguntas frecuentes (FAQ)

**¿Necesito TypeScript para usar bibliotecas de JS?**
No, pero TypeScript puede usar bibliotecas JS: si la biblioteca no incluye tipos, instala `@types/...` o crea declaraciones mínimas.

**¿Puedo migrar un proyecto JS existente a TS gradualmente?**
Sí. Puedes renombrar archivos `.js` a `.ts` o usar `allowJs: true` en `tsconfig` y migrar poco a poco.

**¿TypeScript cambia el rendimiento en producción?**
No en tiempo de ejecución: solo transpila a JS. El rendimiento final depende del JS resultante y del motor JS.
