// this is an example for database creation and connection
import { Sequelize } from "sequelize"
const db = new Sequelize({ dialect: "sqlite", host: "./user/myData.db" })

export async function createDatabase() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}