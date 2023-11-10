import * as sql from 'mssql';
export declare const dbConnection: {
    pool: sql.ConnectionPool;
    connect: () => Promise<void>;
};
