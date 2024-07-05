// models/User.ts
export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
}

export interface Post {
    id: number;
    userId: number;
    title: string;
    content: string;
}