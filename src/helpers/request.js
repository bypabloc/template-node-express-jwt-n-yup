import { languages } from '../lang';

export default {
    getRequestOptions: function(req) {
        const paginationOptions = pagination.getPaginationOptions(req);
        const sortOptions = sorting.getSortingOptions(req);
      
        return Object.assign({}, paginationOptions, sortOptions);
    },
    getFilteringOptions: function(req, parameters) {
        let options = {};
        
        parameters.forEach(function(param) {
            if (req.query[param] !== undefined) {
                options[param] = req.query[param];
            }
        });
        
        return options;
    },
    setHeaderLanguage: (req, res, next) => {
        res['language'] = languages?.[req.headers?.['lang']] ? languages[req.headers?.['lang']] : 'es';
        next();
    },
}