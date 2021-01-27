import express from 'express';
import { login, getUser, signup } from '../controllers/userController.js';
import protectMiddleware from '../middleware/protectMiddleware.js';

const router = express.Router();

// @description - authenticate user and get a token
// @route - POST /api/users/login
// @access - public

router.post('/login', login);
router.post('/signup', signup);

router.route('/profile').get(protectMiddleware, getUser);

// @description - Fetch one producs
// @route - GET/api/products/:id
// @access - public

export default router;
