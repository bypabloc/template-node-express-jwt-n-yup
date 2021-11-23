import Sequelize from 'sequelize';

import { sequelize as connection } from '../config/database';

import UserModel from './user'
import SessionModel from './session'

export const sequelize = connection;

export const User = UserModel(connection, Sequelize);
export const Session = SessionModel(connection, Sequelize);

export default {
    User,
    Session,
}

/**
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

import { sequelize } from '../config/database';

const db = {};
const __dirname = path.resolve(path.dirname('./')) + '/src/models/';

const main = () => {
    return new Promise((resolve, reject) => {
        const files = fs
          .readdirSync('./src/models')
          .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js'))

        files.forEach(async (file, idx) => {
            const importPath = path.join(__dirname, file)
            try {
                const { default: default_function } = await import(importPath)
                const model = default_function(sequelize, Sequelize.DataTypes);
                db[model.name] = model;

                if (idx === files.length - 1) {
                    resolve(db);
                }
                return file
            } catch (err) {
                reject("¡Error!");
            }
        });
    });
}

await main()

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
 */