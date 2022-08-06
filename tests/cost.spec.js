const request = require('supertest');
const app = require('../src/app');

const seedUserId = '79ce51ad-1e5a-43b9-b71f-56cfe18d2253';
const seedTripId = '3bd7c190-ce64-4827-8c0c-58cfef45ad9f';
const seedDebtUserId = '12c06dd6-187a-4a50-927f-5d08b367ee89';

var idCreatedCost = '';

describe('Cost tests', () => {
  it('Teste Criação correto', async () => {
    const response = await request(app)
      .post('/api/cost/create')
      .send({
          description: 'Custo de teste',
          value: 0.0,
          category: 1,
          subcategory: null,
          dtcost: new Date(),
          trip: seedTripId,
          user: seedUserId,
          participants: [seedDebtUserId],
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      idCreatedCost = response.body.id;
  });

  it('Teste Index correto', async () => {
    const response = await request(app)
      .post(`/api/cost/index/${seedTripId}/${seedUserId}`);

    expect(response.status).toBe(200);
  });

  it('Teste Custo diário correto', async () => {
    const response = await request(app)
      .post(`/api/cost/dailyCost`)
      .send({
        trip: seedTripId,
        user: seedUserId,
        dtcost: new Date(),
      });

    expect(response.status).toBe(200);
  });

  it('Teste Leitura errado', async () => {
    const response = await request(app)
      .get(`/api/cost/${idCreatedCost}Errado`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Custo não encontrado!');
  });

  it('Teste Leitura correto', async () => {
    const response = await request(app)
      .get(`/api/cost/${idCreatedCost}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('cost');
  });

  it('Teste Edita errado', async () => {
    const response = await request(app)
      .put(`/api/cost/${idCreatedCost}Errado`)
      .send({
        description: 'Custo de teste Atualizado',
        value: 0.0,
        category: 1,
        subcategory: null,
        dtcost: new Date(),
        trip: seedTripId,
        user: seedUserId,
        participants: [seedDebtUserId],
      });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Custo não encontrado!');
  });

  it('Teste Edita correto', async () => {
    const response = await request(app)
      .put(`/api/cost/${idCreatedCost}`)
      .send({
        description: 'Custo de teste Atualizado',
        value: 0.0,
        category: 1,
        subcategory: null,
        dtcost: new Date(),
        trip: seedTripId,
        user: seedUserId,
        participants: [seedDebtUserId],
      });

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(1);
  });

  it('Teste Deleta errado', async () => {
    const response = await request(app)
      .delete(`/api/cost/${idCreatedCost}Errado`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Custo não encontrado!');
  });

  it('Teste Deleta correto', async () => {
    const response = await request(app)
      .delete(`/api/cost/${idCreatedCost}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(1);
  });
});
