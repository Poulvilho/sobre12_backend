module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('guests', [
      {
        user: '12c06dd6-187a-4a50-927f-5d08b367ee89',
        trip: '3bd7c190-ce64-4827-8c0c-58cfef45ad9f',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('guests', null, {});
  }
};
