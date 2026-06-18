# Proyecto Integrador M2 - API de Blog

**API desplegada:** https://blog-api-production-dffb.up.railway.app
**Documentación en producción:** https://blog-api-production-dffb.up.railway.app/docs

API REST hecha con Node.js, Express y PostgreSQL. Es como un mini blog con autores y posts.

## De que se trata

La API tiene 2 cosas principales:
- **authors**: las personas que escriben
- **posts**: lo que escriben

Un author puede tener varios posts.

## Que usé

- Node.js + Express
- PostgreSQL
- Jest y Supertest para los tests
- Swagger para la documentacion

## Como correrlo en tu compu

1. Clona el repo:
```bash
git clone https://github.com/TU-USUARIO/blog-api.git
cd blog-api
```

2. Instala las dependencias:
```bash
npm install
```

3. Copia el archivo de ejemplo y pon tus datos:
```bash
cp .env.example .env
```
Edita el .env con tu usuario y contraseña de postgres.

4. Crea la base de datos:
```bash
psql -U postgres -h localhost -c "CREATE DATABASE blog_api;"
```

5. Corre los scripts SQL:
```bash
psql -U postgres -h localhost -d blog_api -f db/setup.sql
psql -U postgres -h localhost -d blog_api -f db/seed.sql
```

6. Prende el servidor:
```bash
npm run dev
```

Te deja en http://localhost:3000

## Los endpoints

### Authors
- GET /authors - todos los autores
- GET /authors/:id - uno solo
- POST /authors - crear
- PUT /authors/:id - editar
- DELETE /authors/:id - borrar

### Posts
- GET /posts - todos los posts
- GET /posts/:id - uno solo
- GET /posts/author/:authorId - los posts de un author
- POST /posts - crear
- PUT /posts/:id - editar
- DELETE /posts/:id - borrar

## Documentacion

Entrando a http://localhost:3000/docs se ve la documentacion con Swagger.

## Tests

```bash
npm test
```

Probé que se puedan crear autores y posts, que jale las validaciones (que no se pueda crear sin nombre, etc) y que de 404 cuando algo no existe.

## Subirlo a Railway

1. Crear proyecto en Railway con postgres
2. Conectar este repo
3. Railway te da la DATABASE_URL automatico
4. Correr los scripts sql una vez ahi
5. Comando de inicio: npm start

## Uso de IA

Use Claude  como apoyo puntual durante el desarrollo, para resolver dudas y errores especificos que me iban saliendo.

Prompts que use y como influyeron en el desarrollo:

1. Error E404 al instalar dependencias
   -> Detecto que tenia un error de tipeo (escribi "doteng" en vez de "dotenv").

2. Error de autenticacion: la autentificacion password fallo para el usuario postgres
   -> Me explico que la contraseña en mi .env no coincidia con la real de mi PostgreSQL, y me guio para verificarla con psql.

3. No deja escribir en la terminal (cuando el servidor estaba corriendo)
   -> Me explico que necesitaba abrir una segunda terminal en VS Code para no detener el servidor mientras hacia otras cosas.

4. Error: listen EADDRINUSE: address already in use :::3000
   -> Me explico que era un proceso anterior ocupando el puerto, como verlo con netstat y matarlo, o como cambiar de puerto en el .env.

5. Revision de mi archivo pool.js
   -> Reviso mi codigo y me señalo errores especificos de sintaxis (escribi "hots" en vez de "host", una coma en vez de un punto), explicandome por que rompian la conexion.

6. Error ECONNREFUSED con el puerto 5434
   -> Me ayudo a diagnosticar que mi .env tenia mal el puerto de PostgreSQL (puse 5434 cuando mi instalacion real corria en 5432).

7. AggregateError [ECONNREFUSED] (cuando ya tenia el puerto correcto)
   -> Detecto que el servicio de PostgreSQL estaba detenido en Windows y me guio a iniciarlo desde services.msc.

8. Revision de mi archivo app.js
   -> Me señalo varios errores de sintaxis seguidos (app.get en vez de app.use para el manejador de errores, if(require,main en vez de require.main, comillas simples en vez de backticks, module.express en vez de module.exports).

9. SyntaxError: Unexpected token const en pool.js
   -> Identifico que habia declarado la variable pool dos veces por accidente al intentar usar DATABASE_URL para Railway, y me explico como usar un operador ternario correctamente.

10. Para que sirve COALESCE en mi query de UPDATE
    -> Me explico que COALESCE permite actualizar solo los campos que el usuario envia, dejando los demas igual: si el valor que llega es null/undefined, usa el valor que ya estaba en la fila en vez de borrarlo.

11. Por que se usan $1, $2, etc en las queries en vez de meter las variables directo en el texto
    -> Me explico el concepto de consultas parametrizadas y por que evitan SQL injection: el valor se manda por separado y la base de datos nunca lo interpreta como parte del comando SQL, aunque el usuario intente meter codigo malicioso en un campo de texto.

12. Quiero probarlo en railway
    -> Me sugirio usar la misma documentacion Swagger que ya tenia desplegada para probar POST, PUT y DELETE sin necesidad de instalar Postman.

13. Error 500 en PUT /posts/7 desde Swagger en Railway
    -> Encontramos juntos un bug real: cuando el body de una peticion PUT venia vacio, req.body llegaba como undefined y rompia el codigo al intentar desestructurarlo. Me ayudo a corregirlo agregando req.body || {} en las rutas PUT de authors.js y posts.js.

El codigo lo fui escribiendo yo, y usaba Claude cuando me trababa con algo especifico, no entendia un error, o necesitaba ayuda para probar que todo funcionara bien.