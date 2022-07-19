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
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
