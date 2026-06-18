const express = require('express');
const router = express.Router();
const postsService = require('../services/postsService');
const { validatePostCreate } = require('../middlewares/validators');

router.get('/', async (req, res, next) => {
  try {
    const posts = await postsService.getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const post = await postsService.getPostById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
});

router.get('/author/:authorId', async (req, res, next) => {
  try {
    const posts = await postsService.getPostsByAuthorId(req.params.authorId);
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.post('/', validatePostCreate, async (req, res, next) => {
  try {
    const { title, content, author_id, published } = req.body;
    
    const post = await postsService.createPost({ title, content, author_id, published });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { title, content, published } = req.body || {};
    const post = await postsService.updatePost(req.params.id, { title, content, published });
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const eliminado = await postsService.deletePost(req.params.id);
    if (!eliminado) return res.status(404).json({ error: 'Post no encontrado' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;