import sql from 'mssql/msnodesqlv8';
export declare const dbConnection: {
    pool: sql.ConnectionPool;
    connect: () => Promise<void>;
};
