const request = require('supertest');
const app = require('../src/app');

var idCreatedTrip = '';

describe('Trip tests', () => {
  it('Teste Index correto', async () => {
    const response = await request(app)
      .post('/api/trip/index/79ce51ad-1e5a-43b9-b71f-56cfe18d2253');

    expect(response.status).toBe(200);
  });

  it('Teste Index convidado correto', async () => {
    const response = await request(app)
      .post('/api/trip/index/12c06dd6-187a-4a50-927f-5d08b367ee89');

    expect(response.status).toBe(200);
  });

  it('Teste Criação correto', async () => {
    const response = await request(app)
      .post('/api/trip/create')
      .send({
          name: 'Viagem de teste',
          description: 'Viagem de teste',
          dtstart: new Date(),
          dtend: new Date(),
          user: '79ce51ad-1e5a-43b9-b71f-56cfe18d2253',
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      idCreatedTrip = response.body.id;
  });

  it('Teste Leitura errado', async () => {
    const response = await request(app)
      .get(`/api/trip/${idCreatedTrip}Errado`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Viagem não encontrada!');
  });

  it('Teste Leitura correto', async () => {
    const response = await request(app)
      .get(`/api/trip/${idCreatedTrip}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
  });

  it('Teste Edita errado', async () => {
    const response = await request(app)
      .put(`/api/trip/${idCreatedTrip}Errado`)
      .send({
        name: 'Viagem de teste Atualizada',
        description: 'Viagem de teste Atualizada',
        dtstart: new Date(),
        dtend: new Date(),
        user: '79ce51ad-1e5a-43b9-b71f-56cfe18d2253',
      });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Viagem não encontrada!');
  });

  it('Teste Edita correto', async () => {
    const response = await request(app)
      .put(`/api/trip/${idCreatedTrip}`)
      .send({
        name: 'Viagem de teste Atualizada',
        description: 'Viagem de teste Atualizada',
        dtstart: new Date(),
        dtend: new Date(),
        user: '79ce51ad-1e5a-43b9-b71f-56cfe18d2253',
      });

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(1);
  });

  it('Teste Deleta errado', async () => {
    const response = await request(app)
      .delete(`/api/trip/${idCreatedTrip}Errado`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Viagem não encontrada!');
  });

  it('Teste Deleta correto', async () => {
    const response = await request(app)
      .delete(`/api/trip/${idCreatedTrip}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(1);
  });
});
