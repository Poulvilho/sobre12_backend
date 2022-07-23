module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('subcategories', [
      {
        id: '98ff6e63-cfbe-4bbd-9789-2dcf023b8251',
        description: 'TCC',
        category: 6,
        trip: '3bd7c190-ce64-4827-8c0c-58cfef45ad9f',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('subcategories', null, {});
  }
};
