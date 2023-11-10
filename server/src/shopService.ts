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

  async addProduct(name: string, categoryId: boolean, count: number): Promise<any> {
    try {
      await dbConnection.connect();

      const sqlQuery = 'INSERT INTO Product(Productname, CategoryId,Count) VALUES (@Productname, @CategoryId,@Count)';

      const result = await dbConnection.pool
        .request()
        .input('Productname', VarChar(255), name)
        .input('CategoryId', Int, categoryId)
        .input('Count', Int, count)
        .query(sqlQuery);

      return result.recordset;
    } catch (error) {
      throw error;
    }
  }
}

export default ShopService;
