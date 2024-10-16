module.exports = {
    port: 5000,
    // baseUrl: 'http://localhost:5000',
    // mysql: {
    //   host: 'localhost',
    //   user: 'root', // Replace with your MySQL username
    //   password: 'root', // Replace with your MySQL password
    //   database: 'xldashboard'
    // },

    baseUrl: '/api',
    mysql: {
        port: 3306,
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
    },
//!SECTION
//!SECTION
  };

