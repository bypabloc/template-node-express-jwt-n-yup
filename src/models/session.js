import pkg from 'sequelize';
const { Model } = pkg

import { User } from '../models';

const PROTECTED_ATTRIBUTES = [];

export default (sequelize, DataTypes) => {
    class Session extends Model {
        toJSON() {
            const attributes = { ...this.get() };
            for (const a of PROTECTED_ATTRIBUTES) {
                delete attributes[a];
            }
            return attributes;
        }
        static associate(models) {
        }
    };
    Session.init({
        token: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: {
                args: false,
                msg: 'Debe indicar un token',
            },
            unique: {
                args: true,
                msg: 'El token ya existe',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: {
                args: false,
                msg: 'Debe indicar un usuario',
            },
            unique: {
                args: true,
                msg: 'El usuario ya existe',
            },
            // references: {
            //     model: 'users',
            //     key: 'id'
            // },
        },
        expired_at: {
            type: DataTypes.DATE,
            allowNull: {
                args: false,
                msg: 'Debe indicar una fecha de expiración',
            },
        },
        created_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    }, {
        hooks: {
            beforeCreate:  (session, options) => {
                session.setDataValue('created_at', new Date())
            },
            afterCreate:  (session, options) => {
            },

            beforeUpdate: (session) => {
                session.setDataValue('updated_at', new Date())
            },
        },
        sequelize,
        modelName: 'sessions',
        tableName: 'sessions',
        timestamps: false,
    });

    Session.hasOne(User, { foreignKey: 'id', sourceKey: 'user_id'});

    return Session;
};