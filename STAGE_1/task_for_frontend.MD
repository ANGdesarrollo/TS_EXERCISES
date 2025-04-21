# 🧠 Etapa 1: Dominando la asincronía en Frontend como un Senior

**Objetivo general:**
Adquirir criterio técnico real para enfrentar escenarios asincrónicos en aplicaciones web, entendiendo métodos de carga, streams en el navegador, control de concurrencia y experiencia de usuario durante operaciones complejas.

**Al completar esta etapa, podrás:**
- Construir interfaces responsivas que no se bloquean en operaciones largas.
- Implementar feedback visual (spinners, barras de progreso, placeholders).
- Manejar peticiones paralelas, lazy loading y cancelaciones.
- Controlar concurrencia, gestionar rate limiting y backpressure con Fetch API.
- Ofrecer UX robusta ante errores, timeouts y cambios en la conectividad.

📌 *Esta etapa está pensada para ejercitar la cabeza, no solo los dedos.*

---

## 📂 Ejercicio 1: Carga de un recurso con feedback visual

### 🎯 Objetivo
Crear una interfaz sencilla que descargue un recurso pesado y muestre al usuario el estado de la operación.

### ✍️ Instrucciones
1. Crea una página HTML + CSS + JavaScript (vanilla o framework ligero).
2. Añade un botón “Cargar recurso”. Al hacer clic:
    - Inicia `fetch(url)` a `https://picsum.photos/3000/2000` (imagen) o `https://jsonplaceholder.typicode.com/photos` (JSON).
    - Usa `AbortController` para timeout a 10 s.
    - Mientras descarga, muestra un spinner o mensaje “Cargando…”.
3. Cuando termine:
    - Si es imagen, muestra la imagen en la página.
    - Si es JSON, muestra el número de objetos recibidos.
4. Muestra mensajes de error según el código HTTP o timeout.

### 🔍 Puntos a cubrir
- Implementación de timeout con `AbortController`.
- No bloquear el hilo principal.
- UX de error: diferenciar 401, 404, 500 y timeout.

### ❓ Reflexión
> ¿Qué diferencias observaste entre `XMLHttpRequest` y `fetch` al manejar estados de carga?

---

## 📂 Ejercicio 2: Galería paralela con placeholders

### 🎯 Objetivo
Construir una galería que cargue múltiples imágenes en paralelo mostrando su progreso individual.

### ✍️ Instrucciones
1. Crea un grid que acepte 20 URLs de imágenes (pueden ser de `picsum.photos`).
2. Para cada URL:
    - Renderiza un placeholder (cuadro gris).
    - Lanza la descarga con `fetch` y `.blob()`.
    - Al finalizar, crea un object URL y asigna `src` a un `<img>`.
    - Si falla, muestra un ícono de error.
3. Muestra un contador global (“5/20 cargadas”) y el tiempo total.
4. Permite al usuario cancelar una descarga específica con `AbortController`.

### 🔍 Puntos a cubrir
- Actualización eficiente del DOM.
- Control de cancelación y liberación de recursos (`URL.revokeObjectURL`).

### ❓ Reflexión
> ¿Cuándo conviene usar `Promise.all` vs. descargas individuales con `Promise.race`?

---

## 📂 Ejercicio 2.5: Lazy loading y optimización de scroll

### 🎯 Objetivo
Implementar carga perezosa de imágenes según su visibilidad en pantalla.

### ✍️ Instrucciones
1. A partir de la galería anterior, usa `IntersectionObserver` para detectar elementos cerca del viewport.
2. Solo al detectarlos, inicia `fetch` y reemplaza el placeholder.
3. Implementa carga progresiva: baja resolución primero y luego alta.
4. Cancela peticiones si el usuario hace scroll rápido y el elemento sale del viewport.

### 🔍 Puntos a cubrir
- Impacto en el tiempo de carga inicial.
- Mecanismo de cancelación con `AbortController`.

### ❓ Reflexión
> ¿Cómo afectaría esta técnica a un feed infinito (infinite scroll)?

---

## 📂 Ejercicio 3: Autocompletado con debounce y throttling

### 🎯 Objetivo
Crear un campo de búsqueda que consulte una API y ofrezca sugerencias en tiempo real, respetando límites de peticiones.

### ✍️ Instrucciones
1. Usa una API pública (p.ej. OpenLibrary Search).
2. Al escribir en un input:
    - Aplica debounce de 300 ms (p.ej. con `lodash.debounce`).
    - Cancela la petición anterior al iniciar una nueva.
    - Limita a 3 peticiones concurrentes; en exceso, encola las solicitudes.
3. Muestra debajo del input una lista de sugerencias.
4. Implementa caché en memoria para consultas repetidas.

### 🔍 Puntos a cubrir
- Debounce vs. throttle: cuándo usar cada uno.
- Gestión de colas simples en frontend.

### ❓ Reflexión
> ¿Cómo mejorarías la UX si la API aplica rate limiting (429)?

---

## 🚀 Ejercicio 4: SPA con gestión avanzada de estados

### 🎯 Objetivo
Desarrollar una mini-aplicación que unifique lo aprendido: descargas, concurrencia, caché y UX de errores.

### ✍️ Instrucciones
1. Elige un framework ligero (Vue, React o vanilla modular) y crea una SPA de “Biblioteca de películas”:
    - Listado paginado desde TMDB u OMDB.
    - Búsqueda en tiempo real con autocompletado.
    - Vista de detalle que carga datos adicionales bajo demanda.
2. Implementa:
    - Caché con TTL.
    - Precarga inteligente (prefetch) de rutas o datos.
    - Estados visuales: loading, error, empty, success.
    - Reintentos automáticos con backoff exponencial.
3. Añade opción de exportar resultados a CSV o JSON.

### 🔍 Puntos a cubrir
- Arquitectura de manejo centralizado de peticiones (servicio/API client).
- Uso de Web Workers si la UI sufre bloqueos.
- Estrategias offline: Service Worker o caché local.

### ❓ Reflexión
> ¿Cómo diseñarías un mecanismo de resumir descargas si la sesión del usuario se interrumpe?

---

## 📚 Recursos útiles
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Lodash Debounce/Throttle](https://lodash.com/docs/#debounce)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API)

