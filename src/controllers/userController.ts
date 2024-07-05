// src/controllers/userController.ts

import { Request, Response } from 'express';
import { User } from '../models/User';
import { authService } from '../services/authService';

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id, 10);

    try {
        const user = await authService.findUserById(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id, 10);
    const { username, email } = req.body;

    try {
        const updatedUser = await authService.updateUser(userId, { username, email });
        res.status(200).json({ user: updatedUser });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteUserAccount = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id, 10);

    try {
        await authService.deleteUser(userId);
        res.status(204).end();
    } catch (error) {
      //  console.error('Error deleting user account:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
