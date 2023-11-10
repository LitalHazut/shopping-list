import * as sql from 'mssql';

const dbConfig = {
  server: 'localhost',
  database: 'shopList',
  options: {
    encrypt: true, // If you are using Microsoft Azure, you need this
    trustedConnection: true, // Use Windows Authentication (integrated security)
  },
};

const pool = new sql.ConnectionPool(dbConfig);
const dbConnection = pool.connect();

export default dbConnection;
