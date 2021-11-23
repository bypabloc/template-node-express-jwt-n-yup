import Sequelize from 'sequelize';

import dotenv from 'dotenv'
dotenv.config();

const env = process.env.NODE_ENV || 'development';

const vars = {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_DATABASE || 'ecommerce-node-express-database',
    port: process.env.DB_PORT || '5432',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_CONNECTION || 'postgres',
    logging: (e) => env !== 'production' ? console.log(`${e}\n\n`) : null,
}

const configList = {
    development: {
        ...vars,
        database: `${process.env.DB_DATABASE}_development`,
    },
    production: {
        ...vars,
        database: `${process.env.DB_DATABASE}_production`,
    },
    test: {
        ...vars,
        database: `${process.env.DB_DATABASE}_test`,
    },
};
const config = configList[env];

// export const sequelize = new Sequelize(config.database, config.username, config.password, config);

export const sequelize = new Sequelize(config);