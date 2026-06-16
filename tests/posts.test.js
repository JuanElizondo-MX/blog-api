const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/db/pool');

afterAll(async () => {
  await pool.end();
});

describe('Posts API', () => {
  test('GET /posts devuelve una lista', async () => {
    const res = await request(app).get('/posts');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /posts crea un post', async () => {
    const res = await request(app)
      .post('/posts')
      .send({ title: 'Post de prueba', content: 'Contenido de prueba', author_id: 1 });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Post de prueba');
  });

  test('POST /posts falla sin title', async () => {
    const res = await request(app)
      .post('/posts')
      .send({ content: 'Sin titulo', author_id: 1 });

    expect(res.status).toBe(400);
  });

  test('GET /posts/:id devuelve 404 si no existe', async () => {
    const res = await request(app).get('/posts/999999');
    expect(res.status).toBe(404);
  });

  test('DELETE /posts/:id devuelve 404 si no existe', async () => {
    const res = await request(app).delete('/posts/999999');
    expect(res.status).toBe(404);
  });
});