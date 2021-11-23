import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { Session } from '../models';
                
import { generateToken } from '../helpers/jwt'

import pkg from 'sequelize';
const { Model } = pkg

const PROTECTED_ATTRIBUTES = ['password'];

export default (sequelize, DataTypes) => {
    class User extends Model {
        toJSON() {
            const attributes = { ...this.get() };
            for (const a of PROTECTED_ATTRIBUTES) {
                delete attributes[a];
            }
            return attributes;
        }
        static associate(models) {
        }

        validPassword(password) {
            return bcrypt.compareSync(password, this.password);
        }

        generateToken() {
            return generateToken({ uuid: this.uuid, user_id: this.id, });
        }

    };
    User.init({
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: {
                args: false,
                msg: 'Please enter your email address',
            },
            unique: {
                args: true,
                msg: 'Email already exists',
            },
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Please enter a valid email address',
                },
            },
        },
        phone: {
            type: DataTypes.STRING,
            // unique: true,
        },
        uuid: DataTypes.UUID,
        password: DataTypes.STRING,
        created_at: {
            allowNull: true,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            allowNull: true,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        status: DataTypes.STRING,
        last_login_at: DataTypes.DATE,
        last_ip_address: DataTypes.STRING,
    }, {
        hooks: {
            beforeCreate: (user, options) => {
                const salt =  bcrypt.genSaltSync(10, 'b')
                user.setDataValue('password', bcrypt.hashSync(user.password, salt))
                
                user.setDataValue('created_at', new Date())
            },
            afterCreate: async (user) => {
            },

            beforeUpdate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10, 'b');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
                user.setDataValue('updated_at', new Date())
            },
        },
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false,
    });
    return User;
}

/*
export default (sequelize, DataTypes) => {
    class User extends Model {
        toJSON() {
            const attributes = { ...this.get() };
            for (const a of PROTECTED_ATTRIBUTES) {
                delete attributes[a];
            }
            return attributes;
        }
        static associate(models) {
        }

        validPassword(password) {
            return bcrypt.compareSync(password, this.password);
        }

        generateToken() {
            return generateToken({ uuid: this.uuid });
        }

    };
    User.init({
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: {
                args: false,
                msg: 'Please enter your email address',
            },
            unique: {
                args: true,
                msg: 'Email already exists',
            },
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Please enter a valid email address',
                },
            },
        },
        phone: {
            type: DataTypes.STRING,
            // unique: true,
        },
        uuid: DataTypes.UUID,
        password: DataTypes.STRING,
        status: DataTypes.STRING,
        last_login_at: DataTypes.DATE,
        last_ip_address: DataTypes.STRING
    }, {
        hooks: {
            beforeCreate:  (user, options) => {
                const salt =  bcrypt.genSaltSync(10, 'b')
                user.setDataValue('password', bcrypt.hashSync(user.password, salt))
            },
            afterCreate:  (user, options) => {
                user.token = generateToken({ uuid: user.uuid })
            },

            beforeUpdate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10, 'b');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            },
        },
        sequelize,
        modelName: 'User',
        tableName: 'users',
    });
    return User;
};
*/