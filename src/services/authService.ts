import { User } from '../models/User';
import { db } from '../utils/database'; // Assuming you have a database connection utility

export const authService = {
    async findUserByEmail(email: string): Promise<User | null> {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows.length > 0 ? rows[0] : null;
    },

    async findUserById(id: number): Promise<User | null> {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    },

    async createUser(newUser: User): Promise<User> {
        const { username, email, password } = newUser;
        const [result] = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
        const insertId = result.insertId;
        return { id: insertId, ...newUser };
    },

    async updateUser(id: number, userData: Partial<User>): Promise<User> {
        const { username, email } = userData;
        await db.query('UPDATE users SET username = ?, email = ? WHERE id = ?', [username, email, id]);
        const updatedUser = await this.findUserById(id);
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return updatedUser;
    },

    async deleteUser(id: number): Promise<void> {
        await db.query('DELETE FROM users WHERE id = ?', [id]);
    },

    async verifyUserCredentials(email: string, password: string): Promise<User | null> {
        const user = await this.findUserByEmail(email);
        if (!user) {
            return null; // User with this email doesn't exist
        }

        const passwordMatch = user.password === password; // Example, replace with proper bcrypt comparison
        if (!passwordMatch) {
            return null; // Passwords don't match
        }

        return user;
    }
};