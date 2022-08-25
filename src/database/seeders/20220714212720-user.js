module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        id: '79ce51ad-1e5a-43b9-b71f-56cfe18d2253',
        name: 'Paulo Victor de Menezes Lopes',
        email: 'pv.paulovictor.vp@gmail.com',
        password: '#Paulo123',
        validated: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '12c06dd6-187a-4a50-927f-5d08b367ee89',
        name: 'João Pedro Mota Jardim',
        email: 'jpmota.unb@gmail.com',
        password: '#Joao123',
        validated: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '841de1bf-f49c-455b-9f30-ce79fb8f2306',
        name: 'Usuário Mockado',
        email: 'mockado@gmail.com',
        password: '#Mockado123',
        validated: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'aea297fb-32f6-4263-a735-84719fb6de12',
        name: 'Usuário Mockado 2',
        email: 'mockado2@gmail.com',
        password: '#Mockado1234',
        validated: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
