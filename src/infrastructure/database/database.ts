import mysql from 'serverless-mysql';

export class Database {
    private static instance: Database;
    private readonly db = mysql({
        config: {
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        },
    });

    private constructor() {
    }

    public static async getInstance(): Promise<Database> {
        if (!Database.instance) {
            Database.instance = new Database();
            await Database.instance.connect();
        }
        return Database.instance;
    }

    private async connect() {
        try {
            await this.db.query('SELECT 1');
            console.log("Connected to MySQL");
        } catch (error) {
            console.error("Error connecting to MySQL:", error);
            throw error;
        }
    }

    public async startTransaction() {
        try {
            await this.db.query('START TRANSACTION');
            console.log("Transaction started");
        } catch (error) {
            console.error("Error starting transaction:", error);
            throw error;
        }
    }

    public async commitTransaction() {
        try {
            await this.db.query('COMMIT');
            console.log("Transaction committed");
        } catch (error) {
            console.error("Error committing transaction:", error);
            throw error;
        } finally {
            await this.db.end();
        }
    }

    public async rollbackTransaction() {
        try {
            await this.db.query('ROLLBACK');
            console.log("Transaction rolled back");
        } catch (error) {
            console.error("Error rolling back transaction:", error);
            throw error;
        } finally {
            await this.db.end();
        }
    }

    public async query(sql: string, values?: any[]) {
        try {
            return await this.db.query(sql, values);
        } catch (error) {
            console.error("Query error:", error);
            throw error;
        }
    }
}