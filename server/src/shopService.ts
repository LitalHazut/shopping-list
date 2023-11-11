// ShopService.ts

import { Int, VarChar } from "mssql";
import { dbConnection } from "./dbConnection";

const sql = require('mssql');

class ShopService {
  async getAllCategories(): Promise<any> {
    await dbConnection.connect();
    const result = await dbConnection.pool.request().query('SELECT * FROM Category');
    return result.recordset;
  }

  async getAllProducts(): Promise<any> {
    await dbConnection.connect();
    const result = await dbConnection.pool.request().query('SELECT * FROM Product');
    return result.recordset;
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
