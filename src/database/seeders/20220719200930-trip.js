module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('trips', [
      {
        id: '3bd7c190-ce64-4827-8c0c-58cfef45ad9f',
        name: 'Corumbá da formatura',
        description: 'Formatura do Paulo e Mota',
        dtstart: new Date(2022, 09, 23),
        dtend: new Date(2022, 09, 25),
        user: '79ce51ad-1e5a-43b9-b71f-56cfe18d2253',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('trips', null, {});
  }
};
