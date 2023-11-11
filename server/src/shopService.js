"use strict";
// ShopService.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = require("mssql");
const dbConnection_1 = require("./dbConnection");
class ShopService {
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield dbConnection_1.dbConnection.connect();
                const result = yield dbConnection_1.dbConnection.pool.request().query('SELECT * FROM Category');
                return result.recordset;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addProduct(name, categoryId, count) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield dbConnection_1.dbConnection.connect();
                const sqlQuery = 'INSERT INTO Product(Productname, CategoryId,Count) VALUES (@Productname, @CategoryId,@Count)';
                const result = yield dbConnection_1.dbConnection.pool
                    .request()
                    .input('Productname', (0, mssql_1.VarChar)(255), name)
                    .input('CategoryId', mssql_1.Int, categoryId)
                    .input('Count', mssql_1.Int, count)
                    .query(sqlQuery);
                return result.recordset;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ShopService;
