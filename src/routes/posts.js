const express = require('express');
const router = express.Router();

let posts = [
  { id: 1, title: 'Introduccion a Node.js', content: 'Node.js es un runtime de JavaScript...', author_id: 1, published: true },
  { id: 2, title: 'PostgreSQL vs MySQL', content: 'Ambas bases de datos tienen ventajas...', author_id: 2, published: true },
  { id: 3, title: 'APIs RESTful', content: 'REST es un estilo arquitectonico...', author_id: 1, published: true },
  { id: 4, title: 'Manejo de errores en Express', content: 'El manejo apropiado de errores...', author_id: 3, published: false },
  { id: 5, title: 'Async/Await explicado', content: 'Las promesas simplifican el codigo asincrono...', author_id: 1, published: false }
];

router.get('/', (req, res) => {
  res.status(200).json(posts);
});

router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post no encontrado' });
  res.status(200).json(post);
});

router.post('/', (req, res) => {
  const { title, content, author_id } = req.body;
  if (!title || !content || !author_id) {
    return res.status(400).json({ error: 'El titulo, contenido y autor son obligatorios' });
  }
  const nuevoPost = { id: posts.length + 1, title, content, author_id, published: false };
  posts.push(nuevoPost);
  res.status(201).json(nuevoPost);
});

router.put('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post no encontrado' });
  const { title, content, published } = req.body;
  if (title) post.title = title;
  if (content) post.content = content;
  if (published !== undefined) post.published = published;
  res.status(200).json(post);
});

router.delete('/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Post no encontrado' });
  posts.splice(index, 1);
  res.status(204).send();
});

module.exports = router;