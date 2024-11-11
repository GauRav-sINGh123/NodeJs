import express from 'express';
const router=express.Router();
import { loginUser, logoutUser, registerUser } from '../controllers/userController.js';
import {upload} from '../middlewares/multer.js'
import {verifyJWT}  from '../middlewares/authMiddleware.js';

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

router.route('/login').post(loginUser)

// secured routes
router.route('/logout').post(verifyJWT,logoutUser);
router

export default router