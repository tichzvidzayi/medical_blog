// src/controllers/authController.ts

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { authService } from '../services/authService';

const saltRounds = 10;
const jwtSecret = 'your_jwt_secret';

export const signUp = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await authService.findUserByEmail(email);
        if (existingUser) {
            res.status(400).json({ error: 'User with this email already exists' });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser: User = {
            username,
            email,
            password: hashedPassword
        };

        const createdUser = await authService.createUser(newUser);

        // Create JWT token
        const token = jwt.sign({ userId: createdUser.id, email: createdUser.email }, jwtSecret);

        res.status(201).json({ user: createdUser, token });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const existingUser = await authService.findUserByEmail(email);
        if (!existingUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid password' });
            return;
        }

        // Create JWT token
        const token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, jwtSecret);

        res.status(200).json({ user: existingUser, token });
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
