const request = require('supertest');
const app = require('../src/app');

var idCreatedBudget = '';

describe('Budget tests', () => {
  it('Teste Index correto', async () => {
    const response = await request(app)
      .post('/api/budget/index/3bd7c190-ce64-4827-8c0c-58cfef45ad9f');

    expect(response.status).toBe(200);
  });

  it('Teste Criação correto', async () => {
    const response = await request(app)
      .post('/api/budget/create')
      .send({
          description: 'Orçamento de teste',
          value: 0.0,
          category: 1,
          dtbudget: new Date(),
          trip: '3bd7c190-ce64-4827-8c0c-58cfef45ad9f',
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      idCreatedBudget = response.body.id;
  });

  it('Teste Leitura errado', async () => {
    const response = await request(app)
      .get(`/api/budget/${idCreatedBudget}Errado`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Orçamento não encontrado!');
  });

  it('Teste Leitura correto', async () => {
    const response = await request(app)
      .get(`/api/budget/${idCreatedBudget}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
  });

  it('Teste Edita errado', async () => {
    const response = await request(app)
      .put(`/api/budget/${idCreatedBudget}Errado`)
      .send({
          description: 'Orçamento de teste Atualizado',
          value: 0.0,
          category: 1,
          dtbudget: new Date(),
          trip: '3bd7c190-ce64-4827-8c0c-58cfef45ad9f',
      });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Orçamento não encontrado!');
  });

  it('Teste Edita correto', async () => {
    const response = await request(app)
      .put(`/api/budget/${idCreatedBudget}`)
      .send({
          description: 'Orçamento de teste Atualizado',
          value: 0.0,
          category: 1,
          dtbudget: new Date(),
          trip: '3bd7c190-ce64-4827-8c0c-58cfef45ad9f',
      });

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(1);
  });

  it('Teste Deleta errado', async () => {
    const response = await request(app)
      .delete(`/api/budget/${idCreatedBudget}Errado`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Orçamento não encontrado!');
  });

  it('Teste Deleta correto', async () => {
    const response = await request(app)
      .delete(`/api/budget/${idCreatedBudget}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(1);
  });
});
