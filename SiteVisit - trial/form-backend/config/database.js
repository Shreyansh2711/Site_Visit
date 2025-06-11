import mysql from 'mysql';
import { config } from "dotenv";

config({
    path: "./config.env",
})

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'inventory',
});



export default connection; 