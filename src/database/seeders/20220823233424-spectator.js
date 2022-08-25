module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('spectators', [
      {
        user: '841de1bf-f49c-455b-9f30-ce79fb8f2306',
        trip: '3bd7c190-ce64-4827-8c0c-58cfef45ad9f',
        spectated: '79ce51ad-1e5a-43b9-b71f-56cfe18d2253',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('spectates', null, {});
  }
};
