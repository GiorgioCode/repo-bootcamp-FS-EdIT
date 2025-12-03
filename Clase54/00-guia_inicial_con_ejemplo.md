# Guía práctica: Crear entorno TypeScript y observar diferencias TS → JS

## 1. Crear carpeta del proyecto e inicializar

``` bash
mkdir ejemplo-ts-dif && cd ejemplo-ts-dif
npm init -y
```

## 2. Instalar TypeScript

``` bash
npm install --save-dev typescript
npx tsc --init
```

## 3. Crear estructura y archivos de prueba

``` bash
mkdir src
```

Archivo `src/index.ts`:

``` ts
import { sumar } from './utils';

const nombre: string = 'María';
console.log(`Hola ${nombre}, 2 + 3 = ${sumar(2,3)}`);
```

Archivo `src/utils.ts`:

``` ts
export function sumar(a: number, b: number): number {
  return a + b;
}
```

## 4. Configurar `tsconfig.json`

``` json
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "commonjs",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "sourceMap": true
  },
  "include": ["src"]
}
```

## 5. Scripts en `package.json`

``` json
"scripts": {
  "build": "tsc",
  "watch": "tsc -w",
  "dev": "node --enable-source-maps dist/index.js"
}
```

## 6. Compilar y revisar diferencia TS → JS

``` bash
npm run build
```

Ejemplo de JS generado (simplificado):

``` js
// dist/utils.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumar = void 0;
function sumar(a, b) {
    return a + b;
}
exports.sumar = sumar;
```

Notas: - los tipos desaparecen, - el import ES se transforma a
`require`, - se generan envolturas CommonJS.

## 7. Ejecutar JS compilado

``` bash
node dist/index.js
```

Salida:

    Hola María, 2 + 3 = 5

## 8. Ejecutar sin compilar (ts-node)

``` bash
npm install --save-dev ts-node
npx ts-node src/index.ts
```

## 9. Comparar diferencias línea por línea

``` bash
diff -u src/index.ts dist/index.js
```

## 10. Limpieza

``` bash
rm -rf dist node_modules package-lock.json
```
