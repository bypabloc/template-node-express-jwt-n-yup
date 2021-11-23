import response from '../../helpers/response'

import { yup, validateObject, setLocaleYup } from '../yup';

export default async (req, res, next) => {
    try {
        setLocaleYup(res.language);
        req.body = await validateObject({
            validations: {
                name: yup.string().required(),
                email: yup.string().email().required().uniqueTable([
                    {
                        table: 'users',
                        column: 'email',
                    },
                ]),
                phone: yup.string().phone().required(),
                password: yup.string().required().min(8).max(50)
                    .mustHaveSpecialCharacter(2)
                    .mustHaveNumber(2)
                    .mustHaveLowerCase(2)
                    .mustHaveUpperCase(2),
                password_confirmation: yup.string().equalTo(yup.ref('password'))
            },
            values: req.body,
        });
        next();
    } catch(errors) {
        console.log('Errors:', errors);
        return response.sendUnprocessableEntity(res, { errors });
    }
};