import express from 'express';
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from '../controllers/postController';

const router = express.Router();

// POST /api/posts
router.post('/', createPost);

// GET /api/posts
router.get('/', getAllPosts);

// GET /api/posts/:id
router.get('/:id', getPostById);

// PUT /api/posts/:id
router.put('/:id', updatePost);

// DELETE /api/posts/:id
router.delete('/:id', deletePost);

export default router;
