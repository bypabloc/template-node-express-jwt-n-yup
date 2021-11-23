import lang from "../lang";

export default {
    sendSuccess: (res, { data = {}, message = [] }) => {
        try {
            const language = lang(res.language);
            const messagesTraslated = message ? message.map(msg => language?.[msg] ? language[msg]() : msg) : [];

            return res.status(200).send({ data, message: messagesTraslated });
        } catch (error) {
            console.log('response -> sendSuccess -> catch', error);
            return res.status(500).send({ 
                errors: ['Error del servidor'],
            });
        }
    },
    sendCreated: (res, { data = {}, message = [] }) => {
        try {
            const language = lang(res.language);
            const messagesTraslated = message ? message.map(msg => language?.[msg] ? language[msg]() : msg) : [];

            return res.status(201).send({ data, message: messagesTraslated });
        } catch (error) {
            console.log('response -> sendCreated -> catch', error);
            return res.status(500).send({ 
                errors: ['Error del servidor'],
            });
        }
    },
    sendBadRequest: (res, { errors = [] }) => {
        try {
            const language = lang(res.language);
            const errorsTraslated = errors ? errors.map(msg => language?.[msg] ? language[msg]() : msg) : [];

            return res.status(400).send({ errors: errorsTraslated });
        } catch (error) {
            console.log('response -> sendBadRequest -> catch', error);
            return res.status(500).send({ 
                errors: ['Error del servidor'],
            });
        }
    },
    sendUnauthorized: (res, { errors = [] }) => {
        try {
            const language = lang(res.language);
            const errorsTraslated = errors ? errors.map(msg => language?.[msg] ? language[msg]() : msg) : [];

            return res.status(401).send({ errors: errorsTraslated });
        } catch (error) {
            console.log('response -> sendUnauthorized -> catch', error);
            return res.status(500).send({ 
                errors: ['Error del servidor'],
            });
        }
    },
    sendForbidden: (res) => {
        try {
            const language = lang(res.language);
            const errors = ['you_do_not_have_rights_to_access_this_resource'];
            
            const errorsTraslated = errors ? errors.map(msg => language?.[msg] ? language[msg]() : msg) : [];

            return res.status(403).send({ errors: errorsTraslated });
        } catch (error) {
            console.log('response -> sendForbidden -> catch', error);
            return res.status(500).send({ 
                errors: ['Error del servidor'],
            });
        }
    },
    sendNotFound: (res) => {
        try {
            const language = lang(res.language);
            const errors = ['resource_not_found'];
            
            const errorsTraslated = errors ? errors.map(msg => language?.[msg] ? language[msg]() : msg) : [];

            return res.status(404).send({ errors: errorsTraslated });
        } catch (error) {
            console.log('response -> sendNotFound -> catch', error);
            return res.status(500).send({ 
                errors: ['Error del servidor'],
            });
        }
    },
    sendUnprocessableEntity: (res, { errors = [] }) => {
        console.log('response -> sendUnprocessableEntity', errors);
        try {
            const language = lang(res.language);
            for (const error_key in errors) {
                const error = errors[error_key];
                let error_formatted = null;
                if(error){
                    error_formatted = error?.map ? (error.map(msg => language?.[msg] ? language[msg]() : msg) ): (language?.[error] ? language[error]() : error);
                }else{
                    error_formatted = [];
                }
                errors[error_key] = error_formatted;
            }
            return res.status(422).send({ errors });
        } catch (error) {
            console.log('response -> sendUnprocessableEntity -> catch', error);
            return res.status(500).send({ 
                errors: ['Error del servidor'],
            });
        }
    },
    setHeadersForCORS: (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Access-Token, Content-Type, Accept");
        next();
    },
    sendInternalServerError: (res, { errors }) => {
        console.log('response -> sendInternalServerError', errors);
        return res.status(500).send({ 
            errors: ['Error del servidor'],
        });
    },
}