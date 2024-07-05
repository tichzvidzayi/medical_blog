// ../utils/database.ts
import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: 'localhost',
  user: 'your_database_user',
  password: 'your_database_password',
  database: 'your_database_name',
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