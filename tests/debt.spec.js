const request = require('supertest');
const app = require('../src/app');

const seedCostId = 'f00c1ee9-078b-4b61-8e3f-a23d68da4312';
const seedTripId = '3bd7c190-ce64-4827-8c0c-58cfef45ad9f';
const seedCostUserId = '79ce51ad-1e5a-43b9-b71f-56cfe18d2253';
const seedDebtUserId = '12c06dd6-187a-4a50-927f-5d08b367ee89';

describe('Debt tests', () => {
  it('Teste Minhas dívidas correto', async () => {
    const response = await request(app)
      .post(`/api/debt/myDebts/${seedTripId}/${seedDebtUserId}`);

    expect(response.status).toBe(200);
  });

  it('Teste Meus créditos correto', async () => {
    const response = await request(app)
      .post(`/api/debt/myCredits/${seedTripId}/${seedCostUserId}`);

    expect(response.status).toBe(200);
  });

  it('Teste Leitura errado', async () => {
    const response = await request(app)
      .get(`/api/debt/${seedCostId}Errado/${seedDebtUserId}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Dívida não encontrada!');
  });

  it('Teste Leitura correto', async () => {
    const response = await request(app)
      .get(`/api/debt/${seedCostId}/${seedDebtUserId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('cost');
      expect(response.body).toHaveProperty('user');
  });

  it('Teste Edita errado', async () => {
    const response = await request(app)
      .put(`/api/debt/${seedCostId}Errado/${seedDebtUserId}`)
      .send({
        value: 0.0,
        settled: true,
    });
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Dívida não encontrada!');
  });

  it('Teste Edita correto', async () => {
    const response = await request(app)
      .put(`/api/debt/${seedCostId}/${seedDebtUserId}`)
      .send({
          value: 0.0,
          settled: true,
      });

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(1);
  });

  it('Teste Edita custo com dívida paga', async () => {
    const response = await request(app)
      .put(`/api/cost/${seedCostId}`)
      .send({
        description: 'Custo de teste Atualizado',
        value: 0.0,
        category: 1,
        subcategory: null,
        dtcost: new Date(),
        trip: '3bd7c190-ce64-4827-8c0c-58cfef45ad9f',
        user: '79ce51ad-1e5a-43b9-b71f-56cfe18d2253',
        participants: ['12c06dd6-187a-4a50-927f-5d08b367ee89'],
      });

      expect(response.status).toBe(406);
      expect(response.body.message)
        .toBe('Custo possui dívidas já pagas e não pode ser alterado!');
  });

  it('Teste Deleta custo com dívida paga', async () => {
    const response = await request(app)
      .delete(`/api/cost/${seedCostId}`);

      expect(response.status).toBe(406);
      expect(response.body.message)
        .toBe('Custo possui dívidas já pagas e não pode ser deletado!');
  });

  it('Teste Deleta errado', async () => {
    const response = await request(app)
      .delete(`/api/debt/${seedCostId}Errado/${seedDebtUserId}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Dívida não encontrada!');
  });

  it('Teste Deleta correto', async () => {
    const response = await request(app)
      .delete(`/api/debt/${seedCostId}/${seedDebtUserId}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(1);
  });
});
