export default {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            email: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING,
            },
            phone: {
                type: Sequelize.STRING,
                // unique: true,
            },
            password: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING
            },
            last_login_at: {
                type: Sequelize.DATE
            },
            last_ip_address: {
                type: Sequelize.STRING
            },
            uuid: {
                type: Sequelize.UUID,
                allowNull: false,
                unique: true,
                defaultValue: Sequelize.literal( 'gen_random_uuid()' ),
                // defaultValue: Sequelize.UUIDV4,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: true,
                type: Sequelize.DATE,
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
    }
};