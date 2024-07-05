// src/models/Post.ts

export interface Post {
    id?: number;
    title: string;
    content: string;
    userId: number;
    created_at?: Date;
}
