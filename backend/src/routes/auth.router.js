import express from 'express';
import { PostSignUp, postloginuser, getUserData, getBikes } from '../controller/auth.controller.js';
import  {isProtectedUser} from '../middleware/auth.js';

const authRouter = express.Router();

// Routes
authRouter.post('/signup', PostSignUp);
authRouter.post('/login', postloginuser);
authRouter.get('/data', isProtectedUser, getUserData);
authRouter.get('/bikes', getBikes);

// Export the router
export { authRouter };
