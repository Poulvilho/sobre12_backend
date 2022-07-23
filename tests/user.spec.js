const request = require('supertest');
const app = require('../src/app');

var idCreatedUser = '';

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
    expect(response.body.message)
      .toBe('Confirme a criação da conta pelo email!');
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
    idCreatedUser = response.body.id;
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
    expect(response.body.message)
      .toBe('Senha enviada para o email solicitado!');
  });
  
  it('Teste Edita errado', async () => {
    const response2 = await request(app)
      .put(`/api/user/${idCreatedUser}Errado`)
      .send({
        name: 'Teste Atualizado',
        email: 'teste@teste.com',
        password: '#Teste123',
      });

    expect(response2.status).toBe(404);
    expect(response2.body.message).toBe('Usuário não encontrado!');
  });
  
  it('Teste Edita correto', async () => {
    const response2 = await request(app)
      .put(`/api/user/${idCreatedUser}`)
      .send({
        name: 'Teste Atualizado',
        email: 'teste@teste.com',
        password: '#Teste123',
      });

    expect(response2.status).toBe(200);
    expect(response2.body.data).toBe(1);
  });
  
  it('Teste Deleta errado', async () => {
    const response2 = await request(app)
      .delete(`/api/user/${idCreatedUser}Errado`);

    expect(response2.status).toBe(404);
    expect(response2.body.message).toBe('Usuário não encontrado!');
  });
  
  it('Teste Deleta correto', async () => {
    const response2 = await request(app)
      .delete(`/api/user/${idCreatedUser}`);

    expect(response2.status).toBe(200);
    expect(response2.body.data).toBe(1);
  });
});
