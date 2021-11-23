import response from '../helpers/response'
import { User } from '../models';

import pkg from 'sequelize';
const { Op } = pkg

const controller = {
    signUp: async (req, res) => {
        console.log('signUp')
        const { email, password, name, phone } = req.body;
        try {
            const user = await User.create({
                name,
                email,
                password,
            });

            const token = await user.generateToken();

            res.cookie("x-auth-token", token, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === 'production' ? true : false,
            });

            return response.sendCreated(res, {
                message: ['account_created_successfully'],
                data: {
                    user: {
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        token,
                    },
                },
            });
        } catch(errors) {
            return response.sendInternalServerError(res, { errors });
        }
    },
    signIn: async (req, res) => {
        console.log('signIn')
        const { email, password } = req.body;
        try {
            const user = await User.findOne({where: {[Op.or]: [ { email } ]}});
            if(!user) {
                return response.sendUnauthorized(res, {
                    errors: ['wrong_credentials'],
                });
            }
            if(!user.validPassword(password)) {
                return response.sendUnauthorized(res, {
                    errors: ['wrong_credentials'],
                });
            }

            const token = await user.generateToken();

            res.cookie("x-auth-token", token, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === 'production' ? true : false,
            });

            return response.sendSuccess(res, {
                message: ['sign_in_successfully'],
                data: {
                    user: {
                        name: user.name,
                        phone: user.phone,
                        token,
                    },
                },
            });
        } catch(errors) {
            return response.sendInternalServerError(res, { errors });
        }
    },
    signOut: async (req, res) => {
        console.log('signOut')
        try {
            req.session.destroy();

            return response.sendSuccess(res, {
                message: ['sign_out_successful'],
            });
        } catch(errors) {
            return response.sendInternalServerError(res, { errors });
        }
    },
};

export default controller;