import { Router } from 'express'
import { usersController } from '../controllers'

import middlewares from '../middlewares'

const {
    authJwt,
} = middlewares

const router = Router();

const { 
    getAllUsers, 
    getById,
} = usersController;

router.post('/get_all_users', [ authJwt ], getAllUsers)
router.post('/get_by_id', [ authJwt ], getById)

export default router;