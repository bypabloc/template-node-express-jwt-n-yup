import response from '../helpers/response'
import getcookies from '../helpers/getcookies'

import { verifyToken } from '../helpers/jwt'

export default async (req, res, next) => {
    try {
        const cookie = await getcookies(req);
        console.log('cookie', cookie)
        const token = cookie['x-auth-token'];
        // const token = req.header("x-auth-token");
        if (!token) {
            return response.sendUnauthorized(res, {
                errors: ['token_not_provided'],
            });
        }

        const verify = await verifyToken({ token });
        if (verify?.errors) {
            return response.sendUnauthorized(res, {
                errors: verify.errors,
            });
        }

        req.session = verify;

        next();
    } catch(errors) {
        console.log('Errors:', errors);
        return response.sendUnprocessableEntity(res, { errors });
    }
};