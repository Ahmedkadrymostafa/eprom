import mysql from 'mysql2/promise';

let DB_HOST = 'localhost';
let DB_USER = 'root';
let DB_PASS = '';
let DB_DATABASE = 'tms'

export async function query({ query, values = [] }: { query: any, values: any }) {
    
    const connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASS,
        database: DB_DATABASE,
      });
    
    try {
        const [result] = await connection.execute(query, values)
        connection.end();
        return result
    }catch (error: any) {
        throw Error(error.message)
    }
}

 const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  
  export default pool;