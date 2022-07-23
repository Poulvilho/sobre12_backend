module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('debts', [
      {
        user: '12c06dd6-187a-4a50-927f-5d08b367ee89',
        cost: 'f00c1ee9-078b-4b61-8e3f-a23d68da4312',
        value: 0.0,
        settled: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('guests', null, {});
  }
};
