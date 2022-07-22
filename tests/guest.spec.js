const request = require('supertest');
const app = require('../src/app');

describe('Guest tests', () => {
  it('Teste Index correto', async () => {
    const response = await request(app)
      .get('/api/guest/index/3bd7c190-ce64-4827-8c0c-58cfef45ad9f');

    expect(response.status).toBe(200);
  });

  it('Teste Criação errado', async () => {
    const response = await request(app)
      .post('/api/guest/create')
      .send({
          email: 'mockadoErrado@gmail.com',
          trip: '3bd7c190-ce64-4827-8c0c-58cfef45ad9f',
      });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Usuário não encontrado');
  });

  it('Teste Criação correto', async () => {
    const response = await request(app)
      .post('/api/guest/create')
      .send({
          email: 'mockado@gmail.com',
          trip: '3bd7c190-ce64-4827-8c0c-58cfef45ad9f',
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
  });

  it('Teste Deleta errado', async () => {
    const response = await request(app)
      .delete('/api/guest/3bd7c190-ce64-4827-8c0c-58cfef45ad9f/841de1bf-f49c-455b-9f30-ce79fb8f2306Errado');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Participante não encontrado!');
  });

  it('Teste Deleta correto', async () => {
    const response = await request(app)
      .delete('/api/guest/3bd7c190-ce64-4827-8c0c-58cfef45ad9f/841de1bf-f49c-455b-9f30-ce79fb8f2306');

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(1);
  });
});
