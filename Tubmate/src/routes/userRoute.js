import express from 'express';
const router=express.Router();
import { registerUser } from '../controllers/userController.js';
import {upload} from '../middlewares/multer.js'


router.route('/register').post(
    upload.fields([
        {
            name:'avatar',
            maxCount:1
        },
        {
            name:'coverImage',
            maxCount:1
        }
    ]),
    registerUser
)

export default router