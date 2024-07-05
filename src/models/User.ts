// src/models/User.ts

export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    created_at?: Date;
}
