'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('sessions', {
            token: {
                primaryKey: true,
                allowNull: false,
                type: Sequelize.STRING
            },
            user_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                    tableName: 'users',
                    },
                    key: 'id'
                },
                allowNull: false
            },
            expired_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
            updated_at: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('sessions');
    }
};
