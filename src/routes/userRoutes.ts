import express from 'express';
import { getUserProfile, updateUserProfile, deleteUserAccount } from '../controllers/userController';

const router = express.Router();

// GET /api/users/:id
router.get('/:id', getUserProfile);

// PUT /api/users/:id
router.put('/:id', updateUserProfile);

// DELETE /api/users/:id
router.delete('/:id', deleteUserAccount);

export default router;
