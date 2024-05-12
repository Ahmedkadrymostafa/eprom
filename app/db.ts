import mysql from 'mysql2/promise';


export async function query({ query, values = [] }: { query: any, values: any }) {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'tms'
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
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tms',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  
  export default pool;