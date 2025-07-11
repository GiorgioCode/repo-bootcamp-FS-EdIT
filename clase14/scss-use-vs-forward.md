
# 🔄 Diferencias entre `@use` y `@forward` en SCSS

En Sass moderno, `@use` y `@forward` reemplazan al antiguo `@import`. Aunque parecidos a primera vista, tienen funciones diferentes y complementarias. Esta guía te explica **cuándo usar cada uno** con ejemplos y una tabla comparativa.

---

## 🎯 ¿Qué hacen `@use` y `@forward`?

| Directiva  | ¿Qué hace?                                                  | ¿Dónde se usa?             |
|------------|--------------------------------------------------------------|-----------------------------|
| `@use`     | **Importa** un archivo SCSS para utilizar su contenido       | En el archivo que necesita usar variables, mixins, etc. |
| `@forward` | **Reexporta** un archivo SCSS para que otros lo puedan usar | En archivos índice (ej: `_index.scss`) |

---

## 🧩 `@use`: Importar y usar código

`@use` te permite **usar** mixins, variables y funciones desde otro archivo. Sass automáticamente **aísla los nombres** usando un **namespace (prefijo)**.

### 🧪 Ejemplo de `@use`

```scss
// _mixins.scss
@mixin centrar {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

```scss
// styles.scss
@use 'mixins';

.box {
  @include mixins.centrar;
}
```

> 🧠 Tenés que escribir `mixins.centrar` porque Sass protege los nombres de cada archivo.

---

## 🔁 `@forward`: Reexportar desde un archivo índice

`@forward` se usa cuando estás **organizando y encapsulando módulos**. Podés crear un archivo central que agrupe y reexporte otros parciales.

### 🗂️ Estructura típica

```
abstracts/
├── _variables.scss
├── _mixins.scss
└── _index.scss
```

### 🔁 `@forward` dentro del índice

```scss
// abstracts/_index.scss
@forward 'variables';
@forward 'mixins';
```

### 📥 Uso desde el archivo principal

```scss
// styles.scss
@use 'abstracts' as a;

.header {
  color: a.$primary-color;
  @include a.centrar;
}
```

> 🎯 Todo lo que estaba en `variables` y `mixins` lo accedés desde `abstracts`.

---

## 🆚 Comparación rápida

| Característica           | `@use`                         | `@forward`                              |
|--------------------------|---------------------------------|------------------------------------------|
| ¿Importa código?         | ✅ Sí                          | ❌ No (solo lo reexporta)               |
| ¿Reexporta código?       | ❌ No                          | ✅ Sí                                    |
| ¿Crea un namespace?      | ✅ Sí (por defecto)            | ✅ Sí (desde el archivo que lo usa)      |
| ¿Dónde se usa?           | En archivos que consumen módulos | En archivos índice que agrupan módulos  |
| ¿Reemplazo de `@import`? | ✅ Principal                   | ✅ Para estructurar proyectos grandes    |

---

## 🧠 Consejos

- ✅ Usá `@use` para **consumir** módulos (como `variables`, `mixins`, `functions`, etc.).
- 🧩 Usá `@forward` para **crear archivos índice** que centralicen módulos y los expongan a otros archivos.
- 🛑 Evitá `@import` en proyectos nuevos, ya que está en desuso.

---

¿Querés ver un proyecto completo con `@use` y `@forward` integrados?
