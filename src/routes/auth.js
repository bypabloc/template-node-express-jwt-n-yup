import { Router } from 'express'
import { authController } from '../controllers'

import authValidations from '../validations/auth'

import middlewares from '../middlewares'

const {
    authJwt,
} = middlewares

const {
    signUpValidation,
    signInValidation,
} = authValidations

const router = Router();

const {
    signUp, 
    signIn, 
    signOut,
} = authController;

router.post('/sign_up', [ signUpValidation ], signUp )
router.post('/sign_in', [ signInValidation ], signIn )
router.post('/sign_out', [ authJwt ], signOut )

export default router;