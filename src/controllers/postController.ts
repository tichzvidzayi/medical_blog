import { Request, Response } from 'express';
import { Post } from '../models/Post';
import { authService } from '../services/authService';

export const createPost = async (req: Request, res: Response): Promise<void> => {
    const { title, content, userId } = req.body;

    try {
        const newPost: Post = {
            title,
            content,
            userId
        };
        const createdPost = await authService.createPost({ title, content, userId });

        res.status(201).json({ post: createdPost });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const posts = await authService.getAllPosts();

        res.status(200).json({ posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
    const postId = parseInt(req.params.id, 10);

    try {
        const post = await authService.getPostById(postId);

        if (!post) {
            res.status(404).json({ error: 'Post not found' });
            return;
        }

        res.status(200).json({ post });
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
    const postId = parseInt(req.params.id, 10);
    const { title, content } = req.body;

    try {
        const updatedPost = await authService.updatePost(postId, { title, content });

        res.status(200).json({ post: updatedPost });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
    const postId = parseInt(req.params.id, 10);

    try {
        await authService.deletePost(postId);

        res.status(204).end();
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
