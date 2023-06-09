import mysql from 'mysql2/promise';

import keys from './keys';

const pool = mysql.createPool(keys.database);//se ejecuta el modulo de conexion a la bd
//permite enviar consultas



pool.getConnection()
  .then((conn) => {
    console.log('DB is connected');
    // Aquí puedes realizar consultas o cualquier operación con la conexión
    // ...
    // Recuerda liberar la conexión cuando hayas terminado
    conn.release();
  })
  .catch((err) => {
    console.error('Error connecting to DB:', err);
  });

export default pool; 