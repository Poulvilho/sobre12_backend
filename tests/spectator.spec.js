const request = require('supertest');
const app = require('../src/app');

const seedTripId = '3bd7c190-ce64-4827-8c0c-58cfef45ad9f';
const seedSpectatedId = '79ce51ad-1e5a-43b9-b71f-56cfe18d2253';
const seedUserId = '841de1bf-f49c-455b-9f30-ce79fb8f2306';

describe('Spectator tests', () => {
  it('Teste Index correto', async () => {
    const response = await request(app)
      .post(`/api/spectator/index`)
      .send({
          trip: seedTripId,
          spectated: seedSpectatedId
      });

    expect(response.status).toBe(200);
  });

  it('Teste Criação errado', async () => {
    const response = await request(app)
      .post('/api/spectator/create')
      .send({
          email: 'mockado2Errado@gmail.com',
          trip: seedTripId,
      });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Usuário não encontrado');
  });

  it('Teste Criação correto', async () => {
    const response = await request(app)
      .post('/api/spectator/create')
      .send({
          email: 'mockado2@gmail.com',
          trip: seedTripId,
          spectated: seedSpectatedId,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
  });

  it('Teste Deleta errado', async () => {
    const response = await request(app)
      .delete(
        `/api/spectator/${seedTripId}/${seedSpectatedId}/${seedUserId}Errado`
      );

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Espectador não encontrado!');
  });

  it('Teste Deleta correto', async () => {
    const response = await request(app)
      .delete(
        `/api/spectator/${seedTripId}/${seedSpectatedId}/${seedUserId}`
      );

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(1);
  });
});
