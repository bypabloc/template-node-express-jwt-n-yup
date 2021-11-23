import jwt from 'jsonwebtoken'
import { momentNow, convertDateToTimeZone } from '../helpers/moment'
import { Session } from '../models';

import pkg from 'sequelize';
const { Op } = pkg

const token_key_env = process.env.TOKEN_KEY_PRIVATE;

export const timeExpired = () => {
    const expirationInSeconds = 60 * 60; // one hour
    const dateTokenExpiration = Date.now() + expirationInSeconds * 1000;

    return {
        dateTokenExpiration,
        expirationInSeconds,
    };
}


export const generateToken = async ({ uuid, user_id }) => {

    const { dateTokenExpiration, expirationInSeconds } = timeExpired();

    const token = jwt.sign(
        {
            uuid,
        },
        token_key_env,
        {
            expiresIn: expirationInSeconds,
        }, 
        { 
            algorithm: 'PS256'
        },
    );

    destroyTokens({ user_id });

    Session.create({
        token,
        user_id,
        expired_at: dateTokenExpiration,
    });
    return token;
}

export const existsToken = async ({ token }) => {
    try {
        return await Session.findOne({
            where: {
                [Op.or]: [ { token } ]
            },
            include: ["User"],
        });
    } catch (error) {
        console.log('error', error);
        return false;
    }
}

export const verifyToken = async ({ token }) => {
    const Session = await existsToken({ token })
    if(!Session) return {
        errors: ['token_failed'],
    };

    const token_expired_at = convertDateToTimeZone({
        date: Session.expired_at,
    });

    const now = momentNow();

    if(now > token_expired_at){
        destroyTokens({ user_id: Session.user_id });
        return {
            errors: ['token_caducated'],
        };
    }

    refreshToken({ session: Session });

    return Session;
}

export const refreshToken = ({ session }) => {
    const { dateTokenExpiration } = timeExpired();
    session.update({
        expired_at: dateTokenExpiration,
    });
}

export const destroyTokens = ({ user_id }) => {
    Session.destroy({
        where: { [Op.or]: [ { user_id } ] },
    })
}