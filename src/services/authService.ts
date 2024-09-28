import { User, Post } from '../models/User';
import { db } from '../utils/database'; 
import bcrypt from 'bcrypt'; 
import { generateUniqueId } from '../utils/generateUniqueId';

const authService = {
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
        return { id: insertId, username, email, password };
    },
    async createPost({ title, content, userId }: { title: string; content: string; userId: number }): Promise<Post> {
        const id = generateUniqueId(); 
        const newPost: Post = {
            id: Number(id),
            title,
            content,
            userId
        };

        return newPost;
    },
    async getPostById(id: number): Promise<Post | null> {
        const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    },

    async getAllPosts(): Promise<Post[]> {
        const [rows] = await db.query('SELECT * FROM posts');
        return rows;
    },

    async updatePost(postId: number, postData: Partial<Post>): Promise<Post> {
        const { title, content } = postData;
        await db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, postId]);
        const updatedPost = await this.getPostById(postId);
        if (!updatedPost) {
            throw new Error('Post not found');
        }
        return updatedPost;
    },

    async deletePost(postId: number): Promise<void> {
        await db.query('DELETE FROM posts WHERE id = ?', [postId]);
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
            return null;
        }
    
        const passwordMatch = await bcrypt.compare(password, user.password); 
        
        if (!passwordMatch) {
            return null; 
        }

        return user;
    }
};

export { authService };
