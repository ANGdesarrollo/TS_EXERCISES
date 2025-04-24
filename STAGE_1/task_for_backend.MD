# 🧠 Etapa 1: Dominando la asincronía y gestión de archivos como un Senior

El objetivo de esta etapa es **adquirir criterio técnico real para enfrentar escenarios asincrónicos del mundo real**. No se trata solo de aprender `async/await`, streams o callbacks, sino de **entender cuándo usar cada enfoque, por qué, y cómo estructurarlo para que escale, sea mantenible y robusto**.

Al finalizar esta etapa vas a poder:
- Tomar decisiones informadas entre `buffer` vs `stream`.
- Implementar control de concurrencia eficiente.
- Crear pipelines asincrónicos que manejan errores y progresos correctamente.
- Anticiparte a problemas de rendimiento y escalabilidad.
- Elevar tu nivel profesional resolviendo problemas con mentalidad senior.

📌 *Esta etapa está pensada para ejercitar la cabeza, no solo los dedos.*

---

## 📂 Ejercicio 1: Descarga básica con buffer y manejo de HTTP

### 🎯 Objetivo
Descargar un único archivo desde una URL concreta y guardar localmente, gestionando cabeceras y redirecciones.

### ✍️ Instrucciones
1. Crea un CLI `my-downloader` que reciba:
    * URL de ejemplo: `https://nbg1-speed.hetzner.com/100MB.bin`
    * Ruta destino (opcional, por defecto `./downloads`).
2. Usa `node-fetch` o `axios` para:
    * Seguir redirecciones (`maxRedirects`).
3. Descarga el contenido con `.arrayBuffer()` o `.buffer()`.
4. Guarda con `fs.writeFile`, manejando errores de red y disco.

### 🔍 Puntos a cubrir
* Devuelve código de salida ≠ 0 en caso de fallo.

### ❓ Reflexión
¿Por qué elegiste buffer en lugar de stream aquí? ¿Qué ventajas y desventajas ves?

---

## 📂 Ejercicio 2: Descarga paralela y gestión de errores

### 🎯 Objetivo
Ampliar el CLI para descargar **varios** archivos en paralelo y controlar fallos individuales.

### ✍️ Instrucciones
1. Define tu propia lista de **al menos 10 URLs** (puedes usar `speed.hetzner.de`: `10MB.bin`, `20MB.bin`, …).
2. Lanza todas las descargas usando `Promise.allSettled`.
3. Si alguna falla, registra el error pero continúa con las demás.
4. Devuelve al final un resumen:
    * Total exitosas vs. fallidas.
    * Tiempos individuales y global.

### 🔍 Puntos a cubrir
* ¿Cómo manejas un timeout o un servidor caído?
* ¿Qué estrategia de retry implementarías?

### ❓ Reflexión
Si una de las descargas se retrasa mucho, ¿cómo lo detectas y qué decides hacer?

---

## 📂 Ejercicio 2.5: Backpressure y streams

### 🎯 Objetivo
Introducir el concepto de **backpressure** al descargar por stream.

### ✍️ Instrucciones
1. Reescribe el Ejercicio 1 usando `response.body.getReader()` o `.pipe()` con `createWriteStream`.
2. Observa cómo Node.js regula el flujo de datos para no saturar la memoria.
3. Mide la memoria consumida al descargar un archivo grande y explica qué ocurre si comentas `.pipe()`.

### 🔍 Puntos a cubrir
* ¿Qué ocurre cuando la escritura en disco es más lenta que la descarga?
* ¿Cómo actúa internamente el motor de streams de Node?

### ❓ Reflexión
¿Por qué es crítico entender backpressure en aplicaciones de alto rendimiento?

---

## 📂 Ejercicio 3: Control de concurrencia y rate limiting

### 🎯 Objetivo
Descargar 100 recursos, pero **limitando** a 5 descargas simultáneas para respetar límites de API y consumo de recursos.

### ✍️ Instrucciones
1. Simula 100 URLs de imágenes de ejemplo: `https://api.example.com/photos/1.jpg` … `/100.jpg`
2. Implementa una cola con `p-limit` o tu propio contador.
3. Registra la latencia y comprueba que nunca hay más de 5 descargas concurrentes.
4. Añade un retraso fijo (p.ej. 200 ms) entre cada descarga para simular rate limiting de la API.

### 🔍 Puntos a cubrir
* ¿Cómo varía el tiempo total si quitas el límite?
* ¿Qué pasa si la API retorna HTTP 429?

### ❓ Reflexión
¿En qué escenarios reales te interesaría esta técnica? (p.ej. calls a servicios con cuotas)

---

## 🚀 Ejercicio 4 (final): Pipeline completo y reporting

### 🎯 Objetivo
Unir todo lo aprendido en un **caso real**: descarga, streams, concurrencia, errores y autenticación.

### ✍️ Instrucciones
1. Lee un archivo `config.json` con:
    * Lista de URLs.
    * Credenciales para Basic Auth.
    * Límite de concurrencia.
    * Ruta de salida.
2. Por cada URL:
    * Descarga con streams y backpressure.
    * Respeta concurrencia y reintentos (hasta 3 veces).
    * Guarda logs en `report.csv` con: URL, estado, tamaño descargado, tiempo, intentos.
3. Al finalizar, muestra por consola estadísticas (total, éxito/fallo, promedio de tiempo).

### 🔍 Puntos a cubrir
* Diseño modular: cada responsabilidad en su módulo.
* Limpieza en caso de cancelación o errores graves.

### ❓ Reflexión
Al mirar tu `report.csv`, ¿qué métricas revisarías para optimizar aún más este pipeline?

---

## 📚 Recursos útiles
- [`node-fetch`](https://www.npmjs.com/package/node-fetch)
- [`axios`](https://axios-http.com/)
- [`fs/promises`](https://nodejs.org/api/fs.html#fspromises)
- [`p-limit`](https://www.npmjs.com/package/p-limit)
- [Control de concurrencia en JS](https://dev.to/ycmjason/javascript-concurrency-control-with-async-await-2mik)
- [Backpressure en Node.js](https://nodejs.org/en/docs/guides/backpressuring-in-streams/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
