# Sitio con SCSS

Este es un sitio web moderno construido con SCSS, utilizando características avanzadas como variables, mixins, funciones y una arquitectura modular.

## Estructura del Proyecto

```
src/
├── scss/
│   ├── base/           # Estilos base y reset
│   ├── components/     # Componentes reutilizables
│   ├── layout/         # Diseño de la página
│   ├── pages/          # Estilos específicos de página
│   ├── themes/         # Temas
│   ├── utils/          # Variables, mixins y funciones
│   └── main.scss       # Archivo principal de SCSS
├── css/               # CSS compilado
└── index.html         # Página principal
```

## Cómo Empezar

1. Clona este repositorio
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Para desarrollo (compilación en tiempo real):
   ```bash
   npm run dev
   ```
4. Para producción (compilación minificada):
   ```bash
   npm run build
   ```

## Características

- Arquitectura modular de SCSS
- Diseño responsivo
- Variables CSS personalizadas
- Mixins y funciones reutilizables
- Sistema de grid flexible
- Componentes estilizados
- Soporte para temas

## Tecnologías Utilizadas

- HTML5
- SCSS/SASS
- NPM (gestor de paquetes)
- Node-sass (compilador de SCSS a CSS)
