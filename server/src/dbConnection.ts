// dbConnection.ts
import * as sql from 'mssql';

const dbConfig = {
  server: 'localhost',
  database: 'shopList',
  options: {
    encrypt: true,
    trustedConnection: true, // Use Windows Authentication
  },
};

const pool = new sql.ConnectionPool(dbConfig);

export const dbConnection = {
  pool,
  connect: async () => {
    await pool.connect();
  },
};
