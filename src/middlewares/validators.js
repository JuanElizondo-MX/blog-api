
function validateAuthorCreate(req, res, next) {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'El nombre y email son obligatorios' });
  }
  next();
}

function validatePostCreate(req, res, next) {
  const { title, content, author_id } = req.body;
  if (!title || !content || !author_id) {
    return res.status(400).json({ error: 'El titulo, contenido y autor son obligatorios' });
  }
  next();
}

module.exports = {
  validateAuthorCreate,
  validatePostCreate,
};