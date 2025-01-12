const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost', // Your database host
    user: 'root',      // Your MySQL username
    password: 'qwerty', // Your MySQL password
    database: 'fraudula', // Your database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Export the pool using promises
module.exports = pool.promise();
