const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/db/pool');

afterAll(async () => {
  await pool.end();
});

describe('Authors API', () => {
  test('GET /authors devuelve una lista', async () => {
    const res = await request(app).get('/authors');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /authors crea un autor', async () => {
    const res = await request(app)
      .post('/authors')
      .send({ name: 'Test User', email: `test${Date.now()}@example.com`, bio: 'Bio de prueba' });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Test User');
  });

  test('POST /authors falla sin name', async () => {
    const res = await request(app)
      .post('/authors')
      .send({ email: 'sinname@example.com' });

    expect(res.status).toBe(400);
  });

  test('GET /authors/:id devuelve 404 si no existe', async () => {
    const res = await request(app).get('/authors/999999');
    expect(res.status).toBe(404);
  });

  test('DELETE /authors/:id devuelve 404 si no existe', async () => {
    const res = await request(app).delete('/authors/999999');
    expect(res.status).toBe(404);
  });
});