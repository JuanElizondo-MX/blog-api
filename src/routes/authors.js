const express = require('express');
const router = express.Router();

let authors = [
    {id: 1, name: 'Sandra Ortiz', email: 'sandra@example.com', bio: 'Desarrolladora full-stack' },
    {id: 2, name: 'Hugo Sanchez', email: 'hugo@example.com', bio: 'Escritor tecnico' },
    {id: 3, name: 'Cristal Lopez', email: 'cristal@example.com', bio: 'Ingeniera de sofware' },
];

router.get('/', (req, res) => {
  res.status(200).json(authors);
});

router.get('/:id', (req, res) => {
  const autor = authors.find(a => a.id === parseInt(req.params.id));
  if (!autor) return res.status(404).json({ error: 'Autor no encontrado' });
  res.status(200).json(autor);
});

router.post('/', (req, res) => {
  const { name, email, bio } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'El nombre y email son obligatorios' });
  }
  const nuevoAutor = { id: authors.length + 1, name, email, bio };
  authors.push(nuevoAutor);
  res.status(201).json(nuevoAutor);
});

router.put('/:id', (req, res) => {
  const autor = authors.find(a => a.id === parseInt(req.params.id));
  if (!autor) return res.status(404).json({ error: 'Autor no encontrado' });
  const { name, email, bio } = req.body;
  if (name) autor.name = name;
  if (email) autor.email = email;
  if (bio) autor.bio = bio;
  res.status(200).json(autor);
});

router.delete('/:id', (req, res) => {
  const index = authors.findIndex(a => a.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Autor no encontrado' });
  authors.splice(index, 1);
  res.status(204).send();
});

module.exports = router;