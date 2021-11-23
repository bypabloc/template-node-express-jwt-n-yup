const factories = require('../factories')

export default {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', factories);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
}