/**
 * ========================================================================
 * SPA AVANZADA - ROUTER COMPLETO CON PARÁMETROS DINÁMICOS
 * ========================================================================
 * 
 * Este ejemplo demuestra la implementación más completa y profesional de una SPA,
 * incluyendo características avanzadas como parámetros dinámicos, manejo de 404,
 * renderizado dinámico de contenido, y navegación interceptada.
 * 
 * CARACTERÍSTICAS AVANZADAS:
 * - Parámetros dinámicos en URLs (/users/:id, /products/:category/:id)
 * - Manejo automático de páginas 404
 * - Interceptación de clicks en enlaces
 * - Breadcrumb dinámico
 * - Renderizado de contenido basado en datos
 * - Navegación visual activa
 * - Extracción y validación de parámetros
 * 
 * CONCEPTOS TÉCNICOS:
 * - Pattern Matching: Coincidencia de patrones de URL con parámetros
 * - Event Delegation: Manejo de eventos a nivel de documento
 * - Dynamic Content Rendering: Generación de HTML basada en datos
 * - URL Parameter Extraction: Extracción de valores de parámetros de URL
 * - Fallback Routing: Manejo de rutas no encontradas
 * 
 * VENTAJAS DE ESTE ENFOQUE:
 * ✅ URLs dinámicas y flexibles (/users/123, /products/electronics/456)
 * ✅ Manejo automático de enlaces sin configuración adicional
 * ✅ Experiencia de usuario rica con navegación visual
 * ✅ Escalable para aplicaciones complejas
 * ✅ Separación clara entre lógica de routing y presentación
 * 
 * CASOS DE USO IDEALES:
 * - E-commerce con categorías y productos
 * - Aplicaciones con perfiles de usuario
 * - Dashboards con secciones dinámicas
 * - Aplicaciones de contenido con IDs únicos
 */

class AdvancedRouter {
    constructor() {
        /**
         * ESTRUCTURA DE DATOS: ROUTES ARRAY
         * =================================
         * A diferencia de los ejemplos anteriores que usaban objetos,
         * aquí usamos un array porque necesitamos:
         * 1. Mantener el orden de evaluación de rutas
         * 2. Soportar patrones complejos con parámetros
         * 3. Permitir múltiples rutas que podrían coincidir parcialmente
         * 
         * ESTRUCTURA DE CADA RUTA:
         * {
         *   pattern: '/users/:id',           // Patrón con parámetros
         *   callback: function(params) {},   // Función que recibe parámetros extraídos
         *   title: 'Detalle de Usuario'     // Título para breadcrumb
         * }
         */
        this.routes = [];
        
        /**
         * ESTADO ACTUAL DEL ROUTER
         * ========================
         * Almacenamos la ruta actualmente activa para referencia.
         * Útil para debugging, analytics, y lógica condicional.
         */
        this.currentRoute = null;
        
        /**
         * INICIALIZACIÓN AUTOMÁTICA
         * =========================
         * Configuramos todos los event listeners y procesamos la ruta inicial.
         */
        this.init();
    }

    /**
     * REGISTRO DE RUTAS CON PATRONES
     * ==============================
     * Permite registrar rutas que incluyen parámetros dinámicos.
     * 
     * @param {string} pattern - Patrón de la ruta (ej: '/users/:id', '/products/:category/:id')
     * @param {function} callback - Función que recibe los parámetros extraídos
     * @param {string} title - Título opcional para mostrar en breadcrumb
     * 
     * EJEMPLOS DE PATRONES:
     * - '/users/:id' → coincide con '/users/123', '/users/abc'
     * - '/products/:category/:id' → coincide con '/products/electronics/456'
     * - '/blog/:year/:month/:slug' → coincide con '/blog/2023/12/mi-articulo'
     */
    addRoute(pattern, callback, title = '') {
        // Agregamos la ruta al array manteniendo toda la información
        this.routes.push({ pattern, callback, title });
    }

    /**
     * INICIALIZACIÓN COMPLETA DEL ROUTER
     * ==================================
     * Configura todos los event listeners necesarios para una SPA avanzada.
     */
    init() {
        /**
         * INTERCEPTACIÓN DE CLICKS EN ENLACES
         * ===================================
         * Utilizamos event delegation para interceptar todos los clicks
         * en elementos que tengan el atributo 'data-route'.
         * 
         * VENTAJAS DE EVENT DELEGATION:
         * - Un solo event listener para toda la aplicación
         * - Funciona con elementos agregados dinámicamente
         * - Mejor rendimiento que múltiples listeners
         * - Mantenimiento más fácil
         */
        document.addEventListener('click', (e) => {
            /**
             * VERIFICACIÓN DE ELEMENTO OBJETIVO
             * =================================
             * matches('[data-route]') verifica si el elemento clickeado
             * tiene el atributo 'data-route', indicando que debe ser
             * manejado por el router.
             * 
             * EJEMPLO DE HTML:
             * <a href="/users/123" data-route>Ver Usuario</a>
             */
            if (e.target.matches('[data-route]')) {
                /**
                 * PREVENCIÓN DEL COMPORTAMIENTO POR DEFECTO
                 * ==========================================
                 * preventDefault() evita que el navegador recargue la página
                 * al hacer clic en un enlace, permitiendo que nuestra SPA
                 * maneje la navegación.
                 */
                e.preventDefault();
                
                /**
                 * NAVEGACIÓN PROGRAMÁTICA
                 * =======================
                 * Extraemos la URL del atributo href y navegamos a ella
                 * usando nuestro sistema de routing.
                 */
                this.navigate(e.target.getAttribute('href'));
            }
        });

        /**
         * MANEJO DE NAVEGACIÓN BACK/FORWARD
         * =================================
         * El evento popstate se dispara cuando el usuario usa los botones
         * de navegación del navegador o las funciones history.back()/forward().
         */
        window.addEventListener('popstate', () => {
            /**
             * PROCESAMIENTO DE RUTA EN POPSTATE
             * =================================
             * Cuando el usuario navega con back/forward, procesamos
             * la nueva ruta basada en location.pathname.
             */
            this.handleRoute(location.pathname);
        });

        /**
         * PROCESAMIENTO DE RUTA INICIAL
         * =============================
         * Al cargar la aplicación, procesamos la ruta inicial
         * para mostrar el contenido correcto desde el inicio.
         */
        this.handleRoute(location.pathname);
    }

    /**
     * NAVEGACIÓN PROGRAMÁTICA AVANZADA
     * ================================
     * Permite navegar a cualquier ruta desde JavaScript, incluyendo
     * rutas con parámetros dinámicos.
     * 
     * @param {string} path - Ruta de destino (ej: '/users/123', '/products/electronics/456')
     * 
     * EJEMPLOS DE USO:
     * router.navigate('/users/123');
     * router.navigate('/products/electronics/456');
     * router.navigate('/blog/2023/12/mi-articulo');
     */
    navigate(path) {
        /**
         * ACTUALIZACIÓN DEL HISTORIAL
         * ===========================
         * Usamos pushState para cambiar la URL sin recargar la página
         * y agregar una nueva entrada al historial del navegador.
         * 
         * PARÁMETROS:
         * - state: null (no necesitamos estado adicional en este ejemplo)
         * - title: '' (los navegadores ignoran este parámetro actualmente)
         * - url: path (la nueva URL que se mostrará)
         */
        history.pushState(null, '', path);
        
        /**
         * PROCESAMIENTO DE LA NUEVA RUTA
         * ==============================
         * Como pushState no dispara popstate, debemos procesar
         * manualmente la nueva ruta.
         */
        this.handleRoute(path);
    }

    /**
     * MANEJADOR PRINCIPAL DE RUTAS AVANZADO
     * =====================================
     * Este es el corazón del router avanzado. Maneja la lógica completa
     * de routing incluyendo pattern matching, extracción de parámetros,
     * y manejo de errores 404.
     * 
     * @param {string} path - La ruta a procesar (ej: '/users/123', '/products/electronics/456')
     */
    handleRoute(path) {
        /**
         * BÚSQUEDA DE RUTA COINCIDENTE
         * ============================
         * Intentamos encontrar una ruta registrada que coincida con el path actual.
         * Este proceso incluye pattern matching y extracción de parámetros.
         */
        const route = this.matchRoute(path);
        
        /**
         * PROCESAMIENTO DE RUTA ENCONTRADA
         * ================================
         * Si encontramos una ruta que coincide, procesamos toda la lógica
         * de actualización de interfaz y ejecución de callbacks.
         */
        if (route) {
            /**
             * ALMACENAMIENTO DE RUTA ACTUAL
             * =============================
             * Guardamos la ruta actual para referencia futura.
             * Útil para debugging, analytics, y lógica condicional.
             */
            this.currentRoute = route;
            
            /**
             * ACTUALIZACIÓN DE PÁGINA VISIBLE
             * ===============================
             * Mostramos la página correspondiente basada en el pageId
             * extraído del patrón de la ruta.
             */
            this.showPage(route.pageId);
            
            /**
             * ACTUALIZACIÓN DE NAVEGACIÓN VISUAL
             * ==================================
             * Actualizamos los elementos de navegación para mostrar
             * cuál enlace está actualmente activo.
             */
            this.updateNavigation(path);
            
            /**
             * ACTUALIZACIÓN DE BREADCRUMB
             * ===========================
             * Actualizamos el breadcrumb con el título de la ruta
             * o el path como fallback.
             */
            this.updateBreadcrumb(route.title || path);
            
            /**
             * EJECUCIÓN DE CALLBACK CON PARÁMETROS
             * ====================================
             * Ejecutamos el callback de la ruta pasando los parámetros
             * extraídos de la URL. Esto permite que cada ruta acceda
             * a sus parámetros dinámicos.
             * 
             * EJEMPLO:
             * Para la ruta '/users/:id' y URL '/users/123':
             * callback({ id: '123' })
             */
            route.callback(route.params);
        } else {
            /**
             * MANEJO DE RUTA NO ENCONTRADA (404)
             * ==================================
             * Si no se encuentra ninguna ruta que coincida,
             * mostramos la página de error 404.
             */
            this.showPage('not-found');
            
            /**
             * BREADCRUMB DE ERROR
             * ===================
             * Actualizamos el breadcrumb con un mensaje de error.
             */
            this.updateBreadcrumb('Página no encontrada');
            
            /**
             * LOGGING DE ERROR PARA DEBUGGING
             * ===============================
             * Registramos el error en consola para facilitar el debugging.
             */
            console.warn(`🚫 Ruta no encontrada: ${path}`);
        }
    }

    /**
     * BÚSQUEDA DE RUTA COINCIDENTE CON PATTERN MATCHING
     * =================================================
     * Este método es el núcleo del sistema de routing avanzado.
     * Itera sobre todas las rutas registradas y busca la primera
     * que coincida con el path proporcionado.
     * 
     * @param {string} path - El path a evaluar (ej: '/users/123', '/products/electronics/456')
     * @returns {object|null} - Objeto con información de la ruta coincidente o null
     * 
     * ALGORITMO:
     * 1. Itera sobre todas las rutas en orden de registro
     * 2. Para cada ruta, intenta extraer parámetros usando su patrón
     * 3. Si la extracción es exitosa, la ruta coincide
     * 4. Retorna la primera coincidencia encontrada
     * 5. Si no hay coincidencias, retorna null
     */
    matchRoute(path) {
        /**
         * ITERACIÓN SOBRE RUTAS REGISTRADAS
         * =================================
         * Usamos un bucle for...of para iterar sobre el array de rutas.
         * El orden importa: la primera ruta que coincida será la seleccionada.
         */
        for (const route of this.routes) {
            /**
             * INTENTO DE EXTRACCIÓN DE PARÁMETROS
             * ===================================
             * Llamamos a extractParams para verificar si el path actual
             * coincide con el patrón de esta ruta y extraer parámetros.
             */
            const params = this.extractParams(route.pattern, path);
            
            /**
             * VERIFICACIÓN DE COINCIDENCIA
             * ============================
             * Si extractParams retorna un objeto (no null), significa
             * que el path coincide con el patrón de esta ruta.
             */
            if (params !== null) {
                /**
                 * CONSTRUCCIÓN DEL OBJETO DE RUTA COMPLETO
                 * ========================================
                 * Retornamos un objeto que incluye:
                 * - Toda la información original de la ruta (...route)
                 * - Los parámetros extraídos (params)
                 * - El ID de página calculado (pageId)
                 */
                return { 
                    ...route, 
                    params, 
                    pageId: this.getPageId(route.pattern) 
                };
            }
        }
        
        /**
         * RETORNO DE NO COINCIDENCIA
         * ==========================
         * Si ninguna ruta coincide, retornamos null para indicar
         * que se debe mostrar la página 404.
         */
        return null;
    }

    /**
     * EXTRACCIÓN DE PARÁMETROS DINÁMICOS
     * ==================================
     * Este método implementa el algoritmo de pattern matching que permite
     * extraer valores de parámetros dinámicos de las URLs.
     * 
     * @param {string} pattern - Patrón de ruta (ej: '/users/:id', '/products/:category/:id')
     * @param {string} path - Path real a evaluar (ej: '/users/123', '/products/electronics/456')
     * @returns {object|null} - Objeto con parámetros extraídos o null si no coincide
     * 
     * EJEMPLOS DE FUNCIONAMIENTO:
     * 
     * pattern: '/users/:id'
     * path: '/users/123'
     * resultado: { id: '123' }
     * 
     * pattern: '/products/:category/:id'
     * path: '/products/electronics/456'
     * resultado: { category: 'electronics', id: '456' }
     * 
     * pattern: '/users/:id'
     * path: '/products/123'
     * resultado: null (no coincide)
     */
    extractParams(pattern, path) {
        /**
         * DIVISIÓN EN SEGMENTOS
         * =====================
         * Dividimos tanto el patrón como el path en segmentos usando '/' como separador.
         * Esto nos permite comparar cada parte individualmente.
         * 
         * EJEMPLO:
         * pattern: '/users/:id' → ['', 'users', ':id']
         * path: '/users/123' → ['', 'users', '123']
         * 
         * NOTA: El primer elemento siempre es '' porque las rutas empiezan con '/'
         */
        const patternParts = pattern.split('/');
        const pathParts = path.split('/');
        
        /**
         * VERIFICACIÓN DE LONGITUD
         * ========================
         * Si el patrón y el path no tienen la misma cantidad de segmentos,
         * no pueden coincidir. Esta es una verificación rápida de compatibilidad.
         * 
         * EJEMPLO:
         * '/users/:id' tiene 3 partes: ['', 'users', ':id']
         * '/users/123/profile' tiene 4 partes: ['', 'users', '123', 'profile']
         * → No coinciden por diferente longitud
         */
        if (patternParts.length !== pathParts.length) return null;
        
        /**
         * OBJETO PARA ALMACENAR PARÁMETROS
         * ================================
         * Creamos un objeto vacío que se llenará con los parámetros
         * extraídos durante la comparación.
         */
        const params = {};
        
        /**
         * COMPARACIÓN SEGMENTO POR SEGMENTO
         * =================================
         * Iteramos sobre cada segmento comparando el patrón con el path real.
         */
        for (let i = 0; i < patternParts.length; i++) {
            /**
             * IDENTIFICACIÓN DE PARÁMETROS DINÁMICOS
             * ======================================
             * Los parámetros dinámicos en el patrón empiezan con ':'.
             * Si encontramos uno, extraemos su valor del path correspondiente.
             */
            if (patternParts[i].startsWith(':')) {
                /**
                 * EXTRACCIÓN DEL NOMBRE Y VALOR DEL PARÁMETRO
                 * ===========================================
                 * - slice(1) remueve el ':' del nombre del parámetro
                 * - pathParts[i] contiene el valor real del parámetro
                 * 
                 * EJEMPLO:
                 * patternParts[i] = ':id' → nombre = 'id'
                 * pathParts[i] = '123' → valor = '123'
                 * resultado: params.id = '123'
                 */
                const paramName = patternParts[i].slice(1);
                const paramValue = pathParts[i];
                params[paramName] = paramValue;
            } else if (patternParts[i] !== pathParts[i]) {
                /**
                 * VERIFICACIÓN DE SEGMENTOS ESTÁTICOS
                 * ===================================
                 * Si el segmento no es un parámetro dinámico, debe coincidir exactamente.
                 * Si no coincide, el patrón no es válido para este path.
                 * 
                 * EJEMPLO:
                 * pattern: '/users/:id'
                 * path: '/products/123'
                 * → 'users' !== 'products', por lo tanto no coincide
                 */
                return null;
            }
        }
        
        /**
         * RETORNO DE PARÁMETROS EXTRAÍDOS
         * ===============================
         * Si llegamos aquí, significa que todos los segmentos coincidieron
         * y hemos extraído exitosamente todos los parámetros.
         */
        return params;
    }

    /**
     * GENERACIÓN DE ID DE PÁGINA DESDE PATRÓN
     * =======================================
     * Este método convierte un patrón de ruta en un ID de elemento HTML
     * que se puede usar para mostrar la página correspondiente.
     * 
     * @param {string} pattern - Patrón de ruta (ej: '/users/:id', '/products', '/about')
     * @returns {string} - ID de página para buscar en el DOM
     * 
     * LÓGICA DE CONVERSIÓN:
     * '/users/:id' → 'users' (primera parte del path)
     * '/products' → 'products'
     * '/about' → 'about'
     * '/' → 'home' (caso especial)
     * 
     * CASOS ESPECIALES:
     * - Si la primera parte contiene ':', se considera una ruta dinámica
     * - Para rutas dinámicas, se puede usar un ID genérico como 'detail'
     */
    getPageId(pattern) {
        /**
         * EXTRACCIÓN DE LA BASE DEL PATRÓN
         * ================================
         * Dividimos el patrón por '/' y tomamos la segunda parte (índice 1)
         * porque la primera siempre es una cadena vacía.
         * 
         * EJEMPLO:
         * '/users/:id'.split('/') → ['', 'users', ':id']
         * Tomamos 'users' (índice 1)
         */
        const base = pattern.split('/')[1] || 'home';
        
        /**
         * MANEJO DE RUTAS DINÁMICAS
         * =========================
         * Si la base contiene ':', significa que es una ruta dinámica.
         * En este caso, podríamos usar un ID genérico o extraer la parte antes del '-'.
         * 
         * EJEMPLO:
         * 'user-detail' → 'user'
         * ':id' → 'detail' (fallback)
         */
        return base.includes(':') ? base.split('-')[0] || 'detail' : base;
    }

    /**
     * CONTROL DE VISIBILIDAD DE PÁGINAS
     * =================================
     * Maneja qué página está visible en un momento dado.
     * Implementa el patrón de mostrar/ocultar páginas típico de SPAs.
     * 
     * @param {string} pageId - ID del elemento de página a mostrar
     * 
     * FUNCIONAMIENTO:
     * 1. Oculta todas las páginas removiendo la clase 'active'
     * 2. Muestra solo la página especificada agregando la clase 'active'
     * 3. Si la página no existe, muestra la página 404 como fallback
     */
    showPage(pageId) {
        /**
         * OCULTACIÓN DE TODAS LAS PÁGINAS
         * ===============================
         * Removemos la clase 'active' de todos los elementos con clase 'page'.
         * Esto asegura que solo una página sea visible a la vez.
         */
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        /**
         * BÚSQUEDA Y MOSTRAR PÁGINA OBJETIVO
         * ==================================
         * Intentamos encontrar la página solicitada por su ID.
         * Si no existe, usamos la página 'not-found' como fallback.
         * 
         * PATRÓN DE FALLBACK:
         * Este es un patrón importante en SPAs para manejar casos donde
         * el contenido esperado no existe en el DOM.
         */
        const targetPage = document.getElementById(pageId) || document.getElementById('not-found');
        
        /**
         * ACTIVACIÓN DE LA PÁGINA OBJETIVO
         * ================================
         * Agregamos la clase 'active' para mostrar la página.
         * El CSS debe estar configurado para mostrar solo elementos .page.active
         */
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        /**
         * LOGGING PARA DEBUGGING
         * ======================
         * Registramos qué página se está mostrando para facilitar el debugging.
         */
        console.log(`📄 Mostrando página: ${pageId}`);
    }

    /**
     * ACTUALIZACIÓN DE NAVEGACIÓN VISUAL
     * ==================================
     * Actualiza los elementos de navegación para mostrar visualmente
     * cuál enlace corresponde a la página actual.
     * 
     * @param {string} path - Path actual de la aplicación
     * 
     * FUNCIONALIDAD:
     * - Remueve la clase 'active' de todos los enlaces
     * - Agrega la clase 'active' al enlace que coincida con el path actual
     * - Maneja casos especiales como la página de inicio
     */
    updateNavigation(path) {
        /**
         * LIMPIEZA DE NAVEGACIÓN ACTIVA
         * =============================
         * Removemos la clase 'active' de todos los enlaces de navegación
         * para empezar con un estado limpio.
         */
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
            
            /**
             * VERIFICACIÓN DE COINCIDENCIA DE ENLACE
             * =====================================
             * Comparamos el atributo href del enlace con el path actual.
             * También manejamos el caso especial de la página de inicio.
             * 
             * CASOS MANEJADOS:
             * - Coincidencia exacta: href === path
             * - Página de inicio: path === '/' y href === '/'
             */
            const linkHref = link.getAttribute('href');
            if (linkHref === path || (path === '/' && linkHref === '/')) {
                /**
                 * MARCADO DE ENLACE ACTIVO
                 * ========================
                 * Agregamos la clase 'active' al enlace que coincide
                 * con la ruta actual para proporcionar feedback visual.
                 */
                link.classList.add('active');
            }
        });
    }

    /**
     * ACTUALIZACIÓN DE BREADCRUMB (MIGAS DE PAN)
     * ==========================================
     * Actualiza el elemento breadcrumb con el título de la página actual.
     * Proporciona contexto al usuario sobre dónde se encuentra en la aplicación.
     * 
     * @param {string} title - Título a mostrar en el breadcrumb
     * 
     * PROPÓSITO DEL BREADCRUMB:
     * - Orientación: Muestra al usuario dónde está
     * - Navegación: Puede permitir navegación rápida (en implementaciones avanzadas)
     * - Accesibilidad: Mejora la experiencia para usuarios con discapacidades
     * - UX: Proporciona contexto visual inmediato
     */
    updateBreadcrumb(title) {
        /**
         * ACTUALIZACIÓN DEL ELEMENTO BREADCRUMB
         * ====================================
         * Buscamos el elemento con ID 'breadcrumb' y actualizamos su contenido.
         * Incluimos verificación de existencia para evitar errores.
         */
        const breadcrumbElement = document.getElementById('breadcrumb');
        if (breadcrumbElement) {
            breadcrumbElement.textContent = title;
            
            /**
             * LOGGING PARA DEBUGGING
             * ======================
             * Registramos la actualización del breadcrumb para debugging.
             */
            console.log(`🍞 Breadcrumb actualizado: ${title}`);
        }
    }
}

/**
 * ========================================================================
 * DATOS DE EJEMPLO PARA SIMULACIÓN DE BASE DE DATOS
 * ========================================================================
 * 
 * En una aplicación real, estos datos vendrían de una API o base de datos.
 * Aquí los definimos estáticamente para demostrar cómo el router puede
 * trabajar con datos dinámicos y renderizar contenido basado en parámetros.
 * 
 * ESTRUCTURA DE DATOS:
 * - Cada entidad tiene un ID único para routing dinámico
 * - Los datos incluyen información suficiente para renderizado
 * - La estructura es extensible para agregar más campos
 */
const sampleData = {
    /**
     * PRODUCTOS DE EJEMPLO
     * ===================
     * Simula un catálogo de productos de una tienda online.
     * Cada producto tiene ID, nombre y precio.
     * 
     * USO EN ROUTING:
     * - Lista completa: /products
     * - Detalle individual: /products/:id (futuro)
     */
    products: [
        { 
            id: 1, 
            name: 'Laptop Pro', 
            price: '$1299',
            description: 'Laptop profesional de alto rendimiento',
            category: 'electronics'
        },
        { 
            id: 2, 
            name: 'Smartphone X', 
            price: '$899',
            description: 'Smartphone de última generación',
            category: 'electronics'
        },
        { 
            id: 3, 
            name: 'Tablet Air', 
            price: '$599',
            description: 'Tablet ultraligera para trabajo y entretenimiento',
            category: 'electronics'
        }
    ],
    
    /**
     * USUARIOS DE EJEMPLO
     * ==================
     * Simula una base de datos de usuarios registrados.
     * Cada usuario tiene ID, nombre y email.
     * 
     * USO EN ROUTING:
     * - Lista completa: /users
     * - Perfil individual: /users/:id
     * 
     * NOTA: Los IDs son números específicos para demostrar
     * cómo el router maneja parámetros dinámicos reales.
     */
    users: [
        { 
            id: 123, 
            name: 'Ana García', 
            email: 'ana@ejemplo.com',
            role: 'Administradora',
            joinDate: '2023-01-15'
        },
        { 
            id: 456, 
            name: 'Carlos López', 
            email: 'carlos@ejemplo.com',
            role: 'Usuario',
            joinDate: '2023-03-22'
        },
        { 
            id: 789, 
            name: 'María Rodríguez', 
            email: 'maria@ejemplo.com',
            role: 'Moderadora',
            joinDate: '2023-02-08'
        }
    ]
};

/**
 * ========================================================================
 * INSTANCIACIÓN Y CONFIGURACIÓN DEL ROUTER AVANZADO
 * ========================================================================
 */

/**
 * CREACIÓN DE LA INSTANCIA DEL ROUTER AVANZADO
 * ============================================
 * Creamos una instancia global del AdvancedRouter que manejará
 * toda la navegación de la aplicación, incluyendo parámetros dinámicos.
 */
const router = new AdvancedRouter();

/**
 * ========================================================================
 * DEFINICIÓN DE RUTAS DE LA APLICACIÓN
 * ========================================================================
 * 
 * Aquí registramos todas las rutas disponibles en la aplicación.
 * Las rutas se evalúan en orden, por lo que las más específicas
 * deben ir antes que las más generales.
 */

/**
 * RUTA: / (PÁGINA DE INICIO)
 * ==========================
 * Ruta raíz de la aplicación. Se activa cuando:
 * - La URL es exactamente: dominio.com/
 * - Es la primera página que ve el usuario
 */
router.addRoute('/', () => {
    // Logging para seguimiento de navegación
    console.log('📍 Página: Inicio');
    
    /**
     * LÓGICA ESPECÍFICA PARA LA PÁGINA DE INICIO:
     * - Mostrar estadísticas generales
     * - Cargar contenido destacado
     * - Inicializar widgets de dashboard
     * - Registrar visita para analytics
     * 
     * En una aplicación real:
     * loadDashboardStats();
     * displayFeaturedContent();
     * initializeHomeWidgets();
     * analytics.track('page_view', { page: 'home' });
     */
}, 'Inicio');

/**
 * RUTA: /products (LISTA DE PRODUCTOS)
 * ====================================
 * Muestra el catálogo completo de productos.
 * Demuestra renderizado dinámico de listas.
 */
router.addRoute('/products', () => {
    // Logging para debugging
    console.log('📍 Página: Productos');
    
    /**
     * RENDERIZADO DINÁMICO DE PRODUCTOS
     * =================================
     * Llamamos a la función que genera el HTML de productos
     * basándose en los datos de ejemplo.
     */
    renderProducts();
    
    /**
     * LÓGICA ADICIONAL PARA PRODUCTOS:
     * - Cargar productos desde API
     * - Configurar filtros y búsqueda
     * - Inicializar paginación
     * - Manejar favoritos del usuario
     * 
     * En una aplicación real:
     * async function loadProducts() {
     *   const products = await api.getProducts();
     *   renderProducts(products);
     *   setupFilters();
     *   initializePagination();
     * }
     */
}, 'Productos');

/**
 * RUTA: /users (LISTA DE USUARIOS)
 * ================================
 * Muestra la lista completa de usuarios registrados.
 * Demuestra manejo de datos de usuarios.
 */
router.addRoute('/users', () => {
    // Logging para debugging
    console.log('📍 Página: Usuarios');
    
    /**
     * RENDERIZADO DINÁMICO DE USUARIOS
     * ================================
     * Generamos la lista de usuarios con enlaces a sus perfiles.
     */
    renderUsers();
    
    /**
     * LÓGICA ADICIONAL PARA USUARIOS:
     * - Verificar permisos de administrador
     * - Cargar usuarios desde API
     * - Configurar búsqueda y filtros
     * - Manejar paginación de usuarios
     * 
     * En una aplicación real:
     * if (!hasAdminPermissions()) {
     *   router.navigate('/unauthorized');
     *   return;
     * }
     * loadUsersFromAPI();
     */
}, 'Usuarios');

/**
 * RUTA DINÁMICA: /users/:id (DETALLE DE USUARIO)
 * ==============================================
 * Esta es la ruta más avanzada del ejemplo. Demuestra:
 * - Extracción de parámetros dinámicos de la URL
 * - Renderizado de contenido específico basado en parámetros
 * - Manejo de casos donde el usuario no existe
 * 
 * EJEMPLOS DE URLs QUE COINCIDEN:
 * - /users/123 → params = { id: '123' }
 * - /users/456 → params = { id: '456' }
 * - /users/abc → params = { id: 'abc' }
 */
router.addRoute('/users/:id', (params) => {
    // Logging con el parámetro extraído
    console.log('📍 Página: Detalle de Usuario', params.id);
    
    /**
     * RENDERIZADO DE DETALLE ESPECÍFICO
     * =================================
     * Pasamos el ID extraído a la función de renderizado
     * para que busque y muestre la información del usuario.
     */
    renderUserDetail(params.id);
    
    /**
     * MOSTRAR PÁGINA DE DETALLE
     * =========================
     * Como esta ruta dinámica no tiene una página HTML específica
     * con ID que coincida exactamente, especificamos manualmente
     * qué página mostrar.
     */
    router.showPage('user-detail');
    
    /**
     * LÓGICA ADICIONAL PARA DETALLE DE USUARIO:
     * - Validar que el ID sea válido
     * - Cargar datos del usuario desde API
     * - Manejar casos de usuario no encontrado
     * - Registrar visita al perfil
     * 
     * En una aplicación real:
     * async function loadUserDetail(userId) {
     *   try {
     *     const user = await api.getUser(userId);
     *     renderUserDetail(user);
     *   } catch (error) {
     *     if (error.status === 404) {
     *       router.navigate('/users');
     *     }
     *   }
     * }
     */
}, 'Detalle de Usuario');

/**
 * RUTA: /about (ACERCA DE)
 * ========================
 * Página estática con información sobre la aplicación o empresa.
 */
router.addRoute('/about', () => {
    // Logging para debugging
    console.log('📍 Página: Acerca de');
    
    /**
     * LÓGICA PARA PÁGINA "ACERCA DE":
     * - Cargar información de la empresa
     * - Mostrar estadísticas de la aplicación
     * - Cargar testimonios de usuarios
     * - Registrar interés en la empresa
     * 
     * En una aplicación real:
     * loadCompanyInfo();
     * displayAppStats();
     * loadTestimonials();
     * analytics.track('about_page_view');
     */
}, 'Acerca de');

/**
 * ========================================================================
 * FUNCIONES DE RENDERIZADO DINÁMICO
 * ========================================================================
 * 
 * Estas funciones demuestran cómo generar contenido HTML dinámicamente
 * basándose en datos y parámetros de routing. Son fundamentales para
 * crear SPAs interactivas y dinámicas.
 * 
 * TÉCNICAS UTILIZADAS:
 * - Template Literals (backticks) para HTML
 * - Array.map() para iteración y transformación
 * - Array.find() para búsqueda de elementos específicos
 * - Manipulación del DOM con innerHTML
 * - Manejo de casos de error (datos no encontrados)
 */

/**
 * RENDERIZADO DE LISTA DE PRODUCTOS
 * =================================
 * Genera dinámicamente el HTML para mostrar todos los productos
 * disponibles en el catálogo.
 * 
 * PROCESO:
 * 1. Obtiene el contenedor del DOM
 * 2. Itera sobre los datos de productos
 * 3. Genera HTML para cada producto
 * 4. Combina todo en un string y lo inserta en el DOM
 */
function renderProducts() {
    /**
     * OBTENCIÓN DEL CONTENEDOR
     * ========================
     * Buscamos el elemento HTML donde se mostrarán los productos.
     * En una aplicación real, podríamos agregar verificación de existencia.
     */
    const container = document.getElementById('product-list');
    
    /**
     * VERIFICACIÓN DE EXISTENCIA DEL CONTENEDOR
     * =========================================
     * Patrón de seguridad para evitar errores si el elemento no existe.
     */
    if (!container) {
        console.error('❌ Contenedor product-list no encontrado');
        return;
    }
    
    /**
     * GENERACIÓN DE HTML DINÁMICO
     * ===========================
     * Utilizamos map() para transformar cada producto en HTML.
     * Template literals (backticks) permiten HTML multilínea legible.
     * 
     * TÉCNICA: map() + join('')
     * - map() crea un array de strings HTML
     * - join('') convierte el array en un solo string
     */
    container.innerHTML = sampleData.products.map(product => `
        <div class="product-item">
            <h3>${product.name}</h3>
            <p class="price"><strong>${product.price}</strong></p>
            <p class="description">${product.description}</p>
            <span class="category">Categoría: ${product.category}</span>
        </div>
    `).join('');
    
    /**
     * LOGGING PARA DEBUGGING
     * ======================
     * Registramos cuántos productos se renderizaron.
     */
    console.log(`🛍️ Renderizados ${sampleData.products.length} productos`);
}

/**
 * RENDERIZADO DE LISTA DE USUARIOS
 * ================================
 * Genera la lista de usuarios con enlaces dinámicos a sus perfiles.
 * Demuestra cómo crear enlaces que funcionan con el router.
 * 
 * CARACTERÍSTICAS ESPECIALES:
 * - Enlaces dinámicos con data-route para interceptación
 * - URLs generadas dinámicamente (/users/${user.id})
 * - Información completa de cada usuario
 */
function renderUsers() {
    /**
     * OBTENCIÓN Y VERIFICACIÓN DEL CONTENEDOR
     * =======================================
     */
    const container = document.getElementById('user-list');
    if (!container) {
        console.error('❌ Contenedor user-list no encontrado');
        return;
    }
    
    /**
     * GENERACIÓN DE HTML CON ENLACES DINÁMICOS
     * ========================================
     * Cada usuario tiene un enlace que usa el patrón /users/:id
     * El atributo data-route permite que el router intercepte el click.
     * 
     * IMPORTANTE: href="/users/${user.id}" genera URLs como:
     * - /users/123
     * - /users/456
     * - /users/789
     */
    container.innerHTML = sampleData.users.map(user => `
        <div class="user-card">
            <h4>${user.name}</h4>
            <p class="email">📧 ${user.email}</p>
            <p class="role">👤 ${user.role}</p>
            <p class="join-date">📅 Miembro desde: ${user.joinDate}</p>
            <a href="/users/${user.id}" data-route class="btn-detail">Ver Detalle</a>
        </div>
    `).join('');
    
    /**
     * LOGGING PARA DEBUGGING
     * ======================
     */
    console.log(`👥 Renderizados ${sampleData.users.length} usuarios`);
}

/**
 * RENDERIZADO DE DETALLE DE USUARIO
 * =================================
 * Esta es la función más avanzada porque:
 * - Recibe un parámetro dinámico (userId)
 * - Busca datos específicos basándose en ese parámetro
 * - Maneja casos de error (usuario no encontrado)
 * - Demuestra el poder de las rutas dinámicas
 * 
 * @param {string} userId - ID del usuario a mostrar (extraído de la URL)
 * 
 * EJEMPLOS DE USO:
 * - URL: /users/123 → renderUserDetail('123')
 * - URL: /users/456 → renderUserDetail('456')
 * - URL: /users/999 → renderUserDetail('999') → Usuario no encontrado
 */
function renderUserDetail(userId) {
    /**
     * BÚSQUEDA DEL USUARIO ESPECÍFICO
     * ===============================
     * Utilizamos find() para buscar el usuario con el ID correspondiente.
     * 
     * IMPORTANTE: Usamos == en lugar de === porque:
     * - userId viene como string de la URL ('123')
     * - user.id en los datos es number (123)
     * - == permite comparación con conversión de tipo
     */
    const user = sampleData.users.find(u => u.id == userId);
    
    /**
     * OBTENCIÓN DEL CONTENEDOR
     * ========================
     */
    const container = document.getElementById('user-info');
    if (!container) {
        console.error('❌ Contenedor user-info no encontrado');
        return;
    }
    
    /**
     * RENDERIZADO CONDICIONAL
     * =======================
     * Si encontramos el usuario, mostramos su información completa.
     * Si no lo encontramos, mostramos un mensaje de error.
     */
    if (user) {
        /**
         * RENDERIZADO DE INFORMACIÓN COMPLETA
         * ===================================
         * Mostramos toda la información disponible del usuario
         * incluyendo datos calculados dinámicamente.
         */
        container.innerHTML = `
            <div class="user-detail-card">
                <h3>👤 ${user.name}</h3>
                <div class="user-details">
                    <p><strong>ID de Usuario:</strong> ${user.id}</p>
                    <p><strong>Email:</strong> <a href="mailto:${user.email}">${user.email}</a></p>
                    <p><strong>Rol:</strong> <span class="role-badge">${user.role}</span></p>
                    <p><strong>Miembro desde:</strong> ${user.joinDate}</p>
                    <p><strong>Última visita:</strong> ${new Date().toLocaleString()}</p>
                </div>
                <div class="user-actions">
                    <a href="/users" data-route class="btn-back">← Volver a la lista</a>
                </div>
            </div>
        `;
        
        /**
         * LOGGING DE ÉXITO
         * ================
         */
        console.log(`✅ Usuario encontrado y renderizado: ${user.name} (ID: ${userId})`);
    } else {
        /**
         * MANEJO DE CASO DE ERROR
         * =======================
         * Si no encontramos el usuario, mostramos un mensaje de error
         * con opciones para el usuario.
         */
        container.innerHTML = `
            <div class="error-message">
                <h3>❌ Usuario no encontrado</h3>
                <p>No se pudo encontrar un usuario con ID: <strong>${userId}</strong></p>
                <div class="error-actions">
                    <a href="/users" data-route class="btn-back">← Volver a la lista de usuarios</a>
                    <a href="/" data-route class="btn-home">🏠 Ir al inicio</a>
                </div>
            </div>
        `;
        
        /**
         * LOGGING DE ERROR
         * ================
         */
        console.warn(`⚠️ Usuario no encontrado con ID: ${userId}`);
    }
}
