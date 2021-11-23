import { Router } from 'express'
import response from '../helpers/response'
import request from '../helpers/request'

const routes = Router();

import root from './root';
import users from './users';
import auth from './auth';

routes.use(response.setHeadersForCORS);
routes.use(request.setHeaderLanguage);

routes.use('/v1/', root);
routes.use('/v1/users', users);
routes.use('/v1/auth', auth);

routes.use((req, res) => {
    response.sendNotFound(res);
});

export default routes;