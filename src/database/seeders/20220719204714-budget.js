module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('budgets', [
      {
        id: 'c3cdc164-d3f3-4ba1-ae98-a2c28eab45ed',
        description: 'Comes',
        value: 40.0,
        category: 1,
        subcategory: null,
        dtbudget: new Date(2022, 09, 23),
        trip: '3bd7c190-ce64-4827-8c0c-58cfef45ad9f',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        id: 'dfd29066-cd25-485c-8722-b429291d0ea3',
        description: 'Bebes',
        value: 30.0,
        category: 4,
        subcategory: '98ff6e63-cfbe-4bbd-9789-2dcf023b8251',
        dtbudget: new Date(2022, 09, 23),
        trip: '3bd7c190-ce64-4827-8c0c-58cfef45ad9f',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('budgets', null, {});
  }
};
