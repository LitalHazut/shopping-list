// ShopService.ts

import { Int, VarChar } from "mssql";
import { dbConnection } from "./dbConnection";


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

  async createProduct(name: string, categoryId: boolean, count: number): Promise<any> {
    try {
      await dbConnection.connect();

      const sqlQuery = 'INSERT INTO Product(ProductName, CategoryID,Count) VALUES (@ProductName, @CategoryID,@Count)';

      const result = await dbConnection.pool
        .request()
        .input('ProductName', VarChar(255), name)
        .input('CategoryID', Int, categoryId)
        .input('Count', Int, count)
        .query(sqlQuery);

      return result.recordset;
    } catch (error) {
      throw error;
    }
  }
  async updateProductCount(productId: string, count: number) {
    try {
      await dbConnection.connect();

      const sqlQuery = 'UPDATE Product SET Count = @Count WHERE ProductID = @ProductID';

      const result = await dbConnection.pool
        .request()
        .input('ProductID', Int, productId)
        .input('Count', Int, count)
        .query(sqlQuery);

      return result.recordset;
    } catch (error) {
      throw error;
    }
  }


}


export default ShopService;
