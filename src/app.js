const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

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