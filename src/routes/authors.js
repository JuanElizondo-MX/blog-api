const express = require('express');
const router = express.Router();
const authorsService = require('../services/authorsService');
const { validateAuthorCreate } = require('../middlewares/validators');

router.get('/', async (req, res, next) => {
  try {
    const autores = await authorsService.getAllAuthors();
    res.status(200).json(autores);
  } catch (err) {
    console.error('ERROR AUTORES:', err.message);
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const autor = await authorsService.getAuthorById(req.params.id);
    if (!autor) return res.status(404).json({ error: 'Autor no encontrado' });
    res.status(200).json(autor);
  } catch (err) {
    next(err);
  }
});

router.post('/', validateAuthorCreate, async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;

    const autor = await authorsService.createAuthor({ name, email, bio });
    res.status(201).json(autor);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Ya existe un autor con ese email' });
    }
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;
    const autor = await authorsService.updateAuthor(req.params.id, { name, email, bio });
    if (!autor) return res.status(404).json({ error: 'Autor no encontrado' });
    res.status(200).json(autor);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const eliminado = await authorsService.deleteAuthor(req.params.id);
    if (!eliminado) return res.status(404).json({ error: 'Autor no encontrado' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;