import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();


const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export const poolConnection = pool;
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const db = {
  async query(sql: string, params?: any[]): Promise<[any, any]> {
    const conn = await connection.getConnection();
    try {
      const [rows, fields] = await conn.query(sql, params);
      return [rows, fields];
    } finally {
      conn.release();
    }
  },
};