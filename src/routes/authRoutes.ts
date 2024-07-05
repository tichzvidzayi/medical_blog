import express from 'express';
import { signUp, signIn } from '../controllers/authController';

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', signUp);

// POST /api/auth/signin
router.post('/signin', signIn);

export default router;
