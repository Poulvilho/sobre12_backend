const request = require('supertest');
const app = require('../src/app');
describe('User tests', () => {
  /*
  it('Teste Registro correto', async (done) => {
    const response = await request(app)
      .post('/api/user/register')
      .send({
          name: 'Paulo Teste',
          email: 'pv.pauloteste.vp@gmail.com',
          password: '#Teste123',
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('id');
    done();
  });
  */
  it('Teste Login correto', async (done) => {
    const response = await request(app)
      .post('/api/user/login')
      .send({
          email: 'pv.pauloteste.vp@gmail.com',
          password: '#Teste123',
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('id');
    done();
  });
  
  /*
  it('Teste Edita correto', async (done) => {
    const response1 = await request(app)
      .post('/api/user/login')
      .send({
          email: 'pv.pauloteste.vp@gmail.com',
          password: '#Teste123',
      });

    const response2 = await request(app)
      .put(`/api/user/${response2.body.data.id}`)
      .send({
        name: 'Paulo Victor Lopes',
        email: 'pv.pauloteste.vp@gmail.com',
        password: '#Teste123',
      });
    
    const response3 = await request(app)
      .post('/api/user/login')
      .send({
          email: 'pv.pauloteste.vp@gmail.com',
          password: '#Teste123',
      });

    expect(response.status).toBe(200);
    expect(response1.body.data.name) != expect(response3.body.data.name)
    done();
  });
  
  it('Teste Deleta correto', async (done) => {
    const response1 = await request(app)
      .post('/api/user/login')
      .send({
          email: 'pv.pauloteste.vp@gmail.com',
          password: '#Teste123',
      });

    const response2 = await request(app)
      .delete(`/api/user/${response2.body.data.id}`);

    expect(response2.status).toBe(200);
    done();
  });
  */
});
