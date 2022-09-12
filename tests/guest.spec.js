const request = require('supertest');
const app = require('../src/app');

const seedTripId = '3bd7c190-ce64-4827-8c0c-58cfef45ad9f';
const seedUserId = '841de1bf-f49c-455b-9f30-ce79fb8f2306';

describe('Guest tests', () => {
  it('Teste Index correto', async () => {
    const response = await request(app)
      .get(`/api/guest/index/${seedTripId}`);

    expect(response.status).toBe(200);
  });

  it('Teste Criação errado', async () => {
    const response = await request(app)
      .post('/api/guest/create')
      .send({
          email: 'respauloErrado@gmail.com',
          trip: seedTripId,
      });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Usuário não encontrado');
  });

  it('Teste Criação correto', async () => {
    const response = await request(app)
      .post('/api/guest/create')
      .send({
          email: 'respaulo@gmail.com',
          trip: seedTripId,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
  });

  it('Teste Editar errado', async () => {
    const response = await request(app)
      .put(`/api/guest/${seedTripId}/${seedUserId}Errado`)
      .send({
          role: 0,
      });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Participante não encontrado!');
  });

  it('Teste Editar correto', async () => {
    const response = await request(app)
      .put(`/api/guest/${seedTripId}/${seedUserId}`)
      .send({
          role: 0,
      });

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(1);
  });

  it('Teste Deleta errado', async () => {
    const response = await request(app)
      .delete(`/api/guest/${seedTripId}/${seedUserId}Errado`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Participante não encontrado!');
  });

  it('Teste Deleta correto', async () => {
    const response = await request(app)
      .delete(`/api/guest/${seedTripId}/${seedUserId}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(1);
  });
});
