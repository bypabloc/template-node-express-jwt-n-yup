import { Router } from 'express'
import { rootController } from '../controllers'

const router = Router();

const { 
    root, 
} = rootController;

router.get('/', root)

export default router;