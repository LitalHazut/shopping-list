import sql from 'mssql/msnodesqlv8'
var config = {
  server: "(localdb)\\MSSQLLocalDB", // Replace here your server name
  database: "shopList",
  options: {
    trustedConnection: true,
  },
  driver: "msnodesqlv8",
};


const pool = new sql.ConnectionPool(config);

export const dbConnection = {
  pool,
  connect: async () => {
    try {
      await pool.connect();
    } catch (error) {
      throw error;
    }
  },
};







