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

  async createProduct(ProductName: string, CategoryID: number, Count: number): Promise<any> {
    try {
      await dbConnection.connect();

      const sqlQuery = 'INSERT INTO Product(ProductName, CategoryID,Count) VALUES (@ProductName, @CategoryID,@Count)';

      const result = await dbConnection.pool
        .request()
        .input('ProductName', VarChar(255), ProductName)
        .input('CategoryID', Int, CategoryID)
        .input('Count', Int, Count)
        .query(sqlQuery);

      return result.recordset;
    } catch (error) {
      throw error;
    }
  }
  async updateProductCount(ProductID: string, Count: number) {
    try {
      await dbConnection.connect();

      const sqlQuery = 'UPDATE Product SET Count = @Count WHERE ProductID = @ProductID';

      const result = await dbConnection.pool
        .request()
        .input('ProductID', Int, ProductID)
        .input('Count', Int, Count)
        .query(sqlQuery);

      return result.recordset;
    } catch (error) {
      throw error;
    }
  }


}


export default ShopService;
