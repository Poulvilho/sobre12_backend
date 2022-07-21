const request = require('supertest');
const app = require('../src/app');

describe('User tests', () => {
  it('Teste Index correto', async () => {
    const response = await request(app)
      .get('/api/user/index');

    expect(response.status).toBe(200);
  });

  it('Teste Registro correto', async () => {
    const response = await request(app)
      .post('/api/user/register')
      .send({
          name: 'Teste',
          email: 'teste@teste.com',
          password: '#Teste123',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Confirme a criação da conta pelo email!');
  });
  
  it('Teste Login errado', async () => {
    const response = await request(app)
      .post('/api/user/login')
      .send({
          email: 'testeErrado@teste.com',
          password: '#Teste123',
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Usuário não encontrado!');
  });
  
  it('Teste Login não validado', async () => {
    const response = await request(app)
      .post('/api/user/login')
      .send({
          email: 'teste@teste.com',
          password: '#Teste123',
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Email não validado!');
  });

  it('Teste Valida errado', async () => {
    const response = await request(app)
      .post('/api/user/emailValidation')
      .send({
          email: 'testeErrado@teste.com',
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Usuário não encontrado!');
  });

  it('Teste Valida correto', async () => {
    const response = await request(app)
      .post('/api/user/emailValidation')
      .send({
          email: 'teste@teste.com',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Usuário validado com sucesso!');
  });
  
  it('Teste Login correto', async () => {
    const response = await request(app)
      .post('/api/user/login')
      .send({
          email: 'teste@teste.com',
          password: '#Teste123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });
  
  it('Teste Esqueci minha senha errado', async () => {
    const response = await request(app)
      .post('/api/user/forgotPassword')
      .send({
          email: 'testeErrado@teste.com',
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Usuário não encontrado!');
  });
  
  it('Teste Esqueci minha senha correto', async () => {
    const response = await request(app)
      .post('/api/user/forgotPassword')
      .send({
          email: 'teste@teste.com',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Senha enviada para o email solicitado!');
  });
  
  it('Teste Edita errado', async () => {
    const response1 = await request(app)
      .post('/api/user/login')
      .send({
          email: 'teste@teste.com',
          password: '#Teste123',
      });

    const response2 = await request(app)
      .put(`/api/user/${response1.body.id}Errado`)
      .send({
        name: 'Teste Atualizado',
        email: 'teste@teste.com',
        password: '#Teste123',
      });

    expect(response2.status).toBe(404);
    expect(response2.body.message).toBe('Usuário não encontrado!');
  });
  
  it('Teste Edita correto', async () => {
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
  });
  
  it('Teste Deleta errado', async () => {
    const response1 = await request(app)
      .post('/api/user/login')
      .send({
          email: 'teste@teste.com',
          password: '#Teste123',
      });

    const response2 = await request(app)
      .delete(`/api/user/${response1.body.id}Errado`);

    expect(response2.status).toBe(404);
    expect(response2.body.message).toBe('Usuário não encontrado!');
  });
  
  it('Teste Deleta correto', async () => {
    const response1 = await request(app)
      .post('/api/user/login')
      .send({
          email: 'teste@teste.com',
          password: '#Teste123',
      });

    const response2 = await request(app)
      .delete(`/api/user/${response1.body.id}`);

    expect(response2.status).toBe(200);
    expect(response2.body.message).toBe('Usuário apagado com sucesso!');
  });
});
