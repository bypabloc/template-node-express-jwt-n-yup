import response from '../../helpers/response'

import { yup, validateObject, setLocaleYup } from '../yup';

export default async (req, res, next) => {
    try {
        setLocaleYup(res.language);
        req.body = await validateObject({
            validations: {
                email: yup.string().email().required(),
                password: yup.string().required(),
            },
            values: req.body,
        });
        next();
    } catch(errors) {
        console.log('Errors:', errors);
        return response.sendUnprocessableEntity(res, { errors });
    }
};