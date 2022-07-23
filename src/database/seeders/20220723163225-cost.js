module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('costs', [
      {
        id: 'f00c1ee9-078b-4b61-8e3f-a23d68da4312',
        description: 'Metade do TCC',
        value: 0.0,
        category: 6,
        subcategory: '98ff6e63-cfbe-4bbd-9789-2dcf023b8251',
        dtcost: new Date(2022, 09, 24),
        user: '79ce51ad-1e5a-43b9-b71f-56cfe18d2253',
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
