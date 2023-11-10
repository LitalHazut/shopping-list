// dbConnection.ts
import * as sql from 'mssql';

const dbConfig = {
  user: 'your_username',
  password: 'your_password',
  server: 'localhost',
  database: 'shopList',
  options: {
    encrypt: true,
  },
};

const pool = new sql.ConnectionPool(dbConfig);

export const dbConnection = {
  pool,
  connect: async () => {
    await pool.connect();
  },
};
