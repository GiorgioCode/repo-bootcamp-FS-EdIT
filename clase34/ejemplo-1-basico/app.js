/**
 * ========================================================================
 * SPA BÁSICA CON HASH ROUTING
 * ========================================================================
 * 
 * Este ejemplo demuestra la implementación más simple de una Single Page Application (SPA)
 * utilizando hash routing (#). El hash routing es la técnica más básica para crear SPAs
 * porque funciona sin necesidad de configuración del servidor.
 * 
 * CONCEPTOS CLAVE:
 * - Hash Fragment: La parte de la URL después del símbolo '#' (ejemplo: #home, #about)
 * - hashchange Event: Evento que se dispara cuando cambia el hash de la URL
 * - Location API: Interfaz del navegador para acceder a información de la URL
 * - DOM Manipulation: Mostrar/ocultar contenido sin recargar la página
 * 
 * VENTAJAS DEL HASH ROUTING:
 * ✅ Funciona con file:// protocol (no necesita servidor)
 * ✅ Compatible con todos los navegadores
 * ✅ Sencillo de implementar
 * ✅ Automáticamente mantiene el historial del navegador
 * 
 * DESVENTAJAS:
 * ❌ URLs menos limpias (siempre tienen #)
 * ❌ Limitado para SEO
 * ❌ No permite parámetros complejos fácilmente
 */

class HashRouter {
    constructor() {
        /**
         * ESTRUCTURA DE DATOS: ROUTES
         * ============================
         * Utilizamos un objeto simple para mapear hashes a funciones callback:
         * {
         *   'home': function() { console.log('En inicio'); },
         *   'about': function() { console.log('En acerca de'); },
         *   'contact': function() { console.log('En contacto'); }
         * }
         * 
         * Esta estructura permite una búsqueda O(1) muy eficiente de rutas.
         */
        this.routes = {};
        
        /**
         * INICIALIZACIÓN AUTOMÁTICA
         * =========================
         * Llamamos a init() inmediatamente para configurar los event listeners
         * y procesar la ruta inicial. Esto asegura que la SPA funcione desde
         * el momento en que se crea la instancia del router.
         */
        this.init();
    }

    /**
     * REGISTRO DE RUTAS
     * =================
     * Este método permite registrar nuevas rutas de forma dinámica.
     * 
     * @param {string} hash - El fragmento hash sin el símbolo '#' (ej: 'home', 'about')
     * @param {function} callback - Función que se ejecuta cuando se navega a esta ruta
     * 
     * EJEMPLO DE USO:
     * router.addRoute('products', () => {
     *   console.log('Cargando productos...');
     *   loadProducts();
     * });
     */
    addRoute(hash, callback) {
        // Almacenamos la relación hash -> callback en nuestro objeto routes
        // Esto nos permite ejecutar código específico para cada ruta
        this.routes[hash] = callback;
    }

    /**
     * INICIALIZACIÓN DEL ROUTER
     * =========================
     * Configura los event listeners necesarios y procesa la ruta inicial.
     * Este método se ejecuta automáticamente en el constructor.
     */
    init() {
        /**
         * EVENT LISTENER: hashchange
         * ==========================
         * El evento 'hashchange' es fundamental para el hash routing.
         * Se dispara automáticamente cuando:
         * - El usuario hace clic en un enlace con href="#algo"
         * - Se cambia location.hash programáticamente
         * - El usuario usa los botones back/forward del navegador
         * - Se modifica la URL manualmente en la barra de direcciones
         * 
         * IMPORTANTE: Usamos arrow function para mantener el contexto 'this'
         */
        window.addEventListener('hashchange', () => this.handleRoute());
        
        /**
         * PROCESAMIENTO DE RUTA INICIAL
         * =============================
         * Cuando la página se carga por primera vez, no se dispara el evento
         * 'hashchange', por lo que debemos procesar manualmente la ruta inicial.
         * Esto asegura que la SPA muestre el contenido correcto desde el inicio.
         */
        this.handleRoute();
    }

    /**
     * MANEJADOR PRINCIPAL DE RUTAS
     * ============================
     * Este es el corazón del router. Se encarga de:
     * 1. Extraer el hash actual de la URL
     * 2. Actualizar la interfaz visual
     * 3. Mostrar/ocultar las páginas correspondientes
     * 4. Ejecutar callbacks específicos de cada ruta
     */
    handleRoute() {
        /**
         * EXTRACCIÓN DEL HASH
         * ===================
         * location.hash devuelve el fragmento hash incluyendo el '#'
         * Ejemplos:
         * - URL: http://example.com/#home → location.hash = "#home"
         * - URL: http://example.com/#about → location.hash = "#about"
         * - URL: http://example.com/ → location.hash = ""
         * 
         * slice(1) remueve el primer carácter ('#')
         * || 'home' proporciona un valor por defecto cuando no hay hash
         */
        const hash = location.hash.slice(1) || 'home';
        
        /**
         * ACTUALIZACIÓN DE INTERFAZ: HASH DISPLAY
         * =======================================
         * Actualizamos un elemento visual que muestra el hash actual.
         * Esto es útil para debugging y para que el usuario vea la ruta activa.
         * 
         * PATRÓN DE SEGURIDAD: Siempre verificamos que el elemento existe
         * antes de manipularlo para evitar errores en caso de que el HTML cambie.
         */
        const hashDisplay = document.getElementById('current-hash');
        if (hashDisplay) {
            // Mostramos el hash con el símbolo '#' para claridad visual
            hashDisplay.textContent = `#${hash}`;
        }

        /**
         * OCULTACIÓN DE TODAS LAS PÁGINAS
         * ===============================
         * Antes de mostrar la página actual, ocultamos todas las demás.
         * Utilizamos querySelectorAll para seleccionar todos los elementos
         * con la clase 'page' y removemos la clase 'active' de cada uno.
         * 
         * TÉCNICA CSS: La clase 'active' controla la visibilidad via CSS:
         * .page { display: none; }
         * .page.active { display: block; }
         */
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        /**
         * MOSTRAR PÁGINA ACTUAL
         * =====================
         * Buscamos el elemento HTML que corresponde al hash actual.
         * Por convención, el ID del elemento debe coincidir con el hash.
         * 
         * EJEMPLO:
         * Hash: 'home' → Busca elemento con id="home"
         * Hash: 'about' → Busca elemento con id="about"
         */
        const currentPage = document.getElementById(hash);
        if (currentPage) {
            // Agregamos la clase 'active' para mostrar la página
            currentPage.classList.add('active');
        }

        /**
         * EJECUCIÓN DE CALLBACKS
         * ======================
         * Si existe un callback registrado para esta ruta, lo ejecutamos.
         * Esto permite ejecutar código específico cuando se navega a cada página,
         * como cargar datos, actualizar contadores, enviar analytics, etc.
         * 
         * PATRÓN DE SEGURIDAD: Verificamos que el callback existe antes de ejecutarlo
         */
        if (this.routes[hash]) {
            this.routes[hash]();
        }
    }
}

/**
 * ========================================================================
 * INSTANCIACIÓN Y CONFIGURACIÓN DEL ROUTER
 * ========================================================================
 */

/**
 * CREACIÓN DE LA INSTANCIA DEL ROUTER
 * ===================================
 * Creamos una instancia global del HashRouter que será utilizada por toda la aplicación.
 * Al crear la instancia, automáticamente se ejecuta el constructor que:
 * 1. Inicializa el objeto routes = {}
 * 2. Llama a init() que configura los event listeners
 * 3. Procesa la ruta inicial con handleRoute()
 * 
 * PATRÓN SINGLETON: Usualmente solo necesitamos una instancia del router por aplicación
 */
const router = new HashRouter();

/**
 * ========================================================================
 * REGISTRO DE RUTAS DE LA APLICACIÓN
 * ========================================================================
 * 
 * Aquí definimos todas las rutas disponibles en nuestra SPA.
 * Cada ruta tiene un hash único y un callback que se ejecuta al navegar a ella.
 */

/**
 * RUTA: HOME (INICIO)
 * ===================
 * Esta es la ruta principal de la aplicación.
 * Se activa cuando:
 * - La URL es: dominio.com/#home
 * - No hay hash (se usa 'home' como default)
 * - El usuario hace clic en el enlace "Inicio"
 */
router.addRoute('home', () => {
    // Logging para debugging y seguimiento de navegación
    console.log('📍 Navegando a: Inicio');
    
    /**
     * AQUÍ PUEDES AGREGAR LÓGICA ESPECÍFICA PARA LA PÁGINA DE INICIO:
     * - Cargar datos del dashboard
     * - Actualizar contadores
     * - Enviar eventos de analytics
     * - Inicializar componentes específicos
     * 
     * Ejemplo:
     * loadDashboardData();
     * updateVisitorCounter();
     * analytics.track('page_view', { page: 'home' });
     */
});

/**
 * RUTA: ABOUT (ACERCA DE)
 * =======================
 * Ruta para la página de información de la empresa/proyecto.
 * Se activa cuando la URL es: dominio.com/#about
 */
router.addRoute('about', () => {
    // Logging para debugging
    console.log('📍 Navegando a: Acerca de');
    
    /**
     * LÓGICA ESPECÍFICA PARA LA PÁGINA "ACERCA DE":
     * - Cargar información de la empresa
     * - Mostrar estadísticas
     * - Cargar testimonios
     * 
     * Ejemplo:
     * loadCompanyInfo();
     * displayTeamMembers();
     * loadTestimonials();
     */
});

/**
 * RUTA: CONTACT (CONTACTO)
 * ========================
 * Ruta para la página de contacto y formularios.
 * Se activa cuando la URL es: dominio.com/#contact
 */
router.addRoute('contact', () => {
    // Logging para debugging
    console.log('📍 Navegando a: Contacto');
    
    /**
     * LÓGICA ESPECÍFICA PARA LA PÁGINA DE CONTACTO:
     * - Inicializar formularios
     * - Cargar información de contacto
     * - Configurar validaciones
     * - Integrar mapas
     * 
     * Ejemplo:
     * initContactForm();
     * loadContactInfo();
     * setupFormValidation();
     * initializeMap();
     */
});

/**
 * ========================================================================
 * DEMOSTRACIÓN DE LA LOCATION API
 * ========================================================================
 * 
 * La Location API es una interfaz del navegador que proporciona información
 * sobre la URL actual y permite manipularla. Es fundamental para entender
 * cómo funcionan las SPAs.
 */

console.log('🌐 Location API Info:');
console.log('=====================================');

/**
 * location.href
 * =============
 * Devuelve la URL completa incluyendo protocolo, dominio, puerto, path, query y hash.
 * 
 * EJEMPLOS:
 * - "https://example.com:8080/app/index.html?user=123#home"
 * - "file:///C:/Users/usuario/Desktop/app/index.html#about"
 * 
 * USOS COMUNES:
 * - Obtener la URL completa para compartir
 * - Debugging de rutas
 * - Redirecciones programáticas: location.href = 'nueva-url'
 */
console.log('- location.href:', location.href);

/**
 * location.hash
 * =============
 * Devuelve solo el fragmento hash de la URL (incluyendo el símbolo '#').
 * 
 * EJEMPLOS:
 * - "#home" cuando la URL es example.com/#home
 * - "#about" cuando la URL es example.com/#about
 * - "" (string vacío) cuando no hay hash
 * 
 * USOS EN HASH ROUTING:
 * - Determinar la ruta actual: location.hash.slice(1)
 * - Cambiar ruta programáticamente: location.hash = 'nueva-ruta'
 * - Detectar cambios con el evento 'hashchange'
 */
console.log('- location.hash:', location.hash);

/**
 * location.pathname
 * =================
 * Devuelve la ruta del path de la URL (sin dominio, query params o hash).
 * 
 * EJEMPLOS:
 * - "/app/index.html" para https://example.com/app/index.html#home
 * - "/" para https://example.com/#about
 * - "/products/123" para https://example.com/products/123
 * 
 * IMPORTANTE PARA HASH ROUTING:
 * En hash routing, el pathname generalmente no cambia porque toda la navegación
 * se maneja a través del hash. Sin embargo, es útil conocerlo para:
 * - Debugging
 * - Migración a History API
 * - Manejo de rutas mixtas
 */
console.log('- location.pathname:', location.pathname);

/**
 * OTRAS PROPIEDADES ÚTILES DE LOCATION:
 * =====================================
 * 
 * location.protocol - "https:" o "http:" o "file:"
 * location.hostname - "example.com"
 * location.port - "8080" o "" si es puerto estándar
 * location.search - "?user=123&tab=profile" (query parameters)
 * location.origin - "https://example.com:8080" (protocolo + dominio + puerto)
 * 
 * MÉTODOS ÚTILES:
 * location.reload() - Recarga la página
 * location.replace(url) - Navega sin agregar al historial
 * location.assign(url) - Navega agregando al historial
 */

console.log('=====================================');
console.log('🚀 Hash Router inicializado correctamente');
console.log('📝 Rutas registradas: home, about, contact');
console.log('🔗 Navega usando los enlaces o cambiando el hash en la URL');
