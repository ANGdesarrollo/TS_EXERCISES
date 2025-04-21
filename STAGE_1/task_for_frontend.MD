# 🧠 Etapa 1: Dominando la asincronía y gestión de descargas en Frontend como un Senior

**Objetivo general:**
Construir aplicaciones web que descargan y gestionan archivos en el navegador, manejando asincronía, streams, concurrencia y UI de progreso de forma escalable y mantenible.

**Al completar esta etapa, podrás:**
- Elegir entre buffer vs. stream en el navegador.
- Controlar concurrencia y backpressure en fetch.
- Mostrar barras de progreso e indicadores de estado en la UI.
- Manejar errores (red, disco virtual, límites de API) y reintentos.

---

## 📂 Ejercicio 1: Descarga básica con Fetch y Blob

### 🎯 Objetivo
Descargar un único archivo desde una URL concreta y ofrecerlo para guardar en el navegador, con UI mínima de progreso.

### ✍️ Instrucciones
1. Crea una página web o componente (p.ej. React/Vue) con un input de URL y un botón “Descargar”.
2. Al hacer clic, usa `fetch(url)` para:
    - Seguir redirecciones (comportamiento por defecto).
    - Soportar **Basic Auth** enviando cabeceras `Authorization` si hay credenciales.
3. Llama a `response.blob()` y crea un enlace `<a download>` con `URL.createObjectURL(blob)` para iniciar la descarga.
4. En la UI, muestra un spinner o mensaje “Descargando…” hasta completar.

### 🔍 Puntos a cubrir
- ¿Cómo indicas al usuario un **401** o un error de red?
- ¿Qué UX ofreces si la descarga tarda mucho?

### ❓ Reflexión
> ¿Por qué elegiste Blob vs. streams directos para esta primera implementación?

---

## 📂 Ejercicio 2: Descarga paralela con indicadores por archivo

### 🎯 Objetivo
Extender la UI para gestionar múltiples descargas simultáneas, cada una con su propio estado y progreso.

### ✍️ Instrucciones
1. Permite al usuario introducir una lista de **al menos 5 URLs** (textarea o inputs dinámicos).
2. Al iniciar, lanza todas las descargas con `Promise.allSettled`.
3. Por cada archivo, muestra en una lista: nombre (URL), estado (descargando, éxito, error) y tiempo transcurrido.
4. Si falla alguno, muestra el error y deja los demás descargando.

### 🔍 Puntos a cubrir
- ¿Cómo actualizas el estado en el DOM de forma eficiente?
- ¿Cómo cancelas una descarga en curso (AbortController)?

### ❓ Reflexión
> ¿Qué ventajas te da manejar estados por archivo en lugar de un mensaje global?

---

## 📂 Ejercicio 2.5: Streams y progreso en tiempo real

### 🎯 Objetivo
Usar la API de streams de Fetch para mostrar progreso real de la descarga.

### ✍️ Instrucciones
1. Reemplaza `response.blob()` por un lector de stream:
   ```js
   const reader = response.body.getReader();
   const contentLength = +response.headers.get('Content-Length');
   let received = 0;
   const chunks = [];
   while(true) {
     const { done, value } = await reader.read();
     if (done) break;
     chunks.push(value);
     received += value.length;
     updateProgress(received / contentLength);
   }
   const blob = new Blob(chunks);
   ```  
2. En la interfaz, dibuja una barra de progreso que refleje `updateProgress()`.

### 🔍 Puntos a cubrir
- ¿Cómo reaccionas si `Content-Length` es `null`?
- ¿Qué sucede si la escritura de chunks es más lenta que la llegada de datos?

### ❓ Reflexión
> ¿Cómo cambian las consideraciones de memoria cuando manejas streams en el navegador?

---

## 📂 Ejercicio 3: Control de concurrencia y UI de rate limiting

### 🎯 Objetivo
Descargar 20 recursos, limitando a **5 descargas simultáneas**, mostrando un dashboard de estados.

### ✍️ Instrucciones
1. Simula 20 URLs (p.ej. imágenes de placeholder).
2. Implementa un gestor de concurrencia en frontend (p.ej. [`p-limit`](https://www.npmjs.com/package/p-limit) adaptado o tu propio pool).
3. Muestra en pantalla un grid o tabla con cada archivo y su estado: pendiente, descargando, éxito, error.
4. Añade un retraso configurable (p.ej. slider UI) para pausar entre descargas y simular límites de API.

### 🔍 Puntos a cubrir
- ¿Cómo actualizas la UI sin bloquear el hilo principal?
- ¿Cómo manejas HTTP 429 y reintentos automáticos?

### ❓ Reflexión
> ¿En qué escenarios de frontend real esto te sería útil? (p.ej. descargar lotes de assets en PWA)

---

## 🚀 Ejercicio 4 (final): SPA completa con configuración y reporting

### 🎯 Objetivo
Crear una **Single Page App** que unifique configuración, descargas por streams, concurrencia y reporte visual.

### ✍️ Instrucciones
1. Carga un `config.json` desde tu servidor con:
    - Lista de URLs.
    - Concurrencia máxima.
    - Retrasos y reintentos.
2. Por cada URL:
    - Descarga usando streams y muestra barra de progreso.
    - Maneja reintentos en caso de fallo (hasta 2 veces).
3. Al terminar todas, muestra un **dashboard** con:
    - Gráficos de tiempos (usando Chart.js o Recharts).
    - Tabla de detalles (URL, estado, tiempo, intentos).
4. Permite exportar el reporte como CSV o JSON desde la UI.

### 🔍 Puntos a cubrir
- Arquitectura modular: servicios de descarga, componentes de UI, utilidades de reporting.
- Uso de Web Workers si la UI se torna lenta.

### ❓ Reflexión
> ¿Cómo mejorarías la UX si el usuario abandona la página a mitad de descargas?  
> ¿Podrías soportar resuming de descargas parciales?

---

Con estos cambios, la etapa 1 está totalmente orientada al **frontend**, complementando la gestión de descargas con una experiencia de usuario sólida y técnicas avanzadas de asincronía en el navegador.

