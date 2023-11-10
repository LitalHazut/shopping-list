// ShopService.ts

import { Int, VarChar } from "mssql";
import { dbConnection } from "./dbConnection";

class ShopService {
  async getAllCategories(): Promise<any> {
    try {
      await dbConnection.connect();
      const result = await dbConnection.pool.request().query('SELECT * FROM Category');
      return result.recordset;
    } catch (error) {
      throw error;
    }
  }

  async addProduct(name: string, categoryId: boolean): Promise<any> {
    try {
      await dbConnection.connect();

      const sqlQuery = 'INSERT INTO Product(name, categoryId) VALUES (@name, @categoryId)';

      const result = await dbConnection.pool
        .request()
        .input('name', VarChar(255), name)
        .input('categoryId', Int, categoryId)
        .query(sqlQuery);

      return result.recordset;
    } catch (error) {
      throw error;
    }
  }
}

export default ShopService;
