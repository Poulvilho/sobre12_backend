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
        id: 'c3cdc164-d3f3-4ba1-ae98-a2c28eab45ed',
        name: 'João Pedro Mota Jardim',
        email: 'jpmota.unb@gmail.com',
        password: '#Joao123',
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
