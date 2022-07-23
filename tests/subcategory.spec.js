const request = require('supertest');
const app = require('../src/app');

const seedTripId = '3bd7c190-ce64-4827-8c0c-58cfef45ad9f';

var idCreatedSubcategory = '';

describe('Subcategory tests', () => {
  it('Teste Index correto', async () => {
    const response = await request(app)
      .post(`/api/subcategory/index/${seedTripId}`);

    expect(response.status).toBe(200);
  });

  it('Teste Criação correto', async () => {
    const response = await request(app)
      .post('/api/subcategory/create')
      .send({
          description: 'Subcategoria de teste',
          category: 1,
          trip: seedTripId,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      idCreatedSubcategory = response.body.id;
  });

  it('Teste Leitura errado', async () => {
    const response = await request(app)
      .get(`/api/subcategory/${idCreatedSubcategory}Errado`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Subcategoria não encontrada!');
  });

  it('Teste Leitura correto', async () => {
    const response = await request(app)
      .get(`/api/subcategory/${idCreatedSubcategory}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
  });

  it('Teste Edita errado', async () => {
    const response = await request(app)
      .put(`/api/subcategory/${idCreatedSubcategory}Errado`)
      .send({
        description: 'Subcategoria de teste Atualizado',
        category: 1,
        trip: seedTripId,
      });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Subcategoria não encontrada!');
  });

  it('Teste Edita correto', async () => {
    const response = await request(app)
      .put(`/api/subcategory/${idCreatedSubcategory}`)
      .send({
        description: 'Subcategoria de teste Atualizado',
        category: 1,
        trip: seedTripId,
      });

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(1);
  });

  it('Teste Deleta errado', async () => {
    const response = await request(app)
      .delete(`/api/subcategory/${idCreatedSubcategory}Errado`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Subcategoria não encontrada!');
  });

  it('Teste Deleta correto', async () => {
    const response = await request(app)
      .delete(`/api/subcategory/${idCreatedSubcategory}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(1);
  });
});
