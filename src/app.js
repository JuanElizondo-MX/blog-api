const express = require('express');
require('dotenv').config();
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();

app.use(express.json());

const swaggerDocument = YAML.load(path.join(__dirname, '..', 'openapi.yaml'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const authorsRouter = require('./routes/authors');
app.use('/authors', authorsRouter);

const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

app.get('/', (req, res) => {
 res.json({ mensaje: 'API de Blog funcionando' });
});

app.use((err, req, res, next) => {
 console.error(err);
 res.status(500).json({ error: 'Error interno del servidor' });
});

const PUERTO = process.env.PORT || 3000; 

if(require.main === module) {
 app.listen(PUERTO, () => { 
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});
}

module.exports =app;