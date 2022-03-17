const request = require('supertest');
const app = require('../src/app');

describe('User tests', () => {

  it('Teste Registro correto', async (done) => {
    const response = await request(app)
      .post('/api/user/register')
      .send({
          name: 'Teste',
          email: 'teste@teste.com',
          password: '#Teste123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    done();
  });
  
  it('Teste Login correto', async (done) => {
    const response = await request(app)
      .post('/api/user/login')
      .send({
          email: 'teste@teste.com',
          password: '#Teste123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    done();
  });
  
  it('Teste Edita correto', async (done) => {
    const response1 = await request(app)
      .post('/api/user/login')
      .send({
          email: 'teste@teste.com',
          password: '#Teste123',
      });

    const response2 = await request(app)
      .put(`/api/user/${response1.body.id}`)
      .send({
        name: 'Teste Atualizado',
        email: 'teste@teste.com',
        password: '#Teste123',
      });

    expect(response2.status).toBe(200);
    expect(response2.body.data).toBe(1);
    done();
  });
  
  it('Teste Deleta correto', async (done) => {
    const response1 = await request(app)
      .post('/api/user/login')
      .send({
          email: 'teste@teste.com',
          password: '#Teste123',
      });

    const response2 = await request(app)
      .delete(`/api/user/${response1.body.id}`);

    expect(response2.status).toBe(200);
    done();
  });
});
