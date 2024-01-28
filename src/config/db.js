//conexion con la base de datos.
import { createPool } from 'mysql2/promise';
//cargar variables de entorno desde el archivo .env
import { config } from 'dotenv';
config();

export const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

