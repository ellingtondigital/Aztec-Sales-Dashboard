const mysql = require('mysql2');
const config = require('../config'); // Import the configuration file
const bcrypt = require('bcrypt');

// MySQL Connection
const connection = mysql.createConnection(config.mysql);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL from login controller.');
});


// Login function
// exports.login = (req, res) => {
//   const { username, password } = req.body;

//   if (username === hardcodedUser.username && password === hardcodedUser.password) {
//     const sql = 'INSERT INTO user_logins (username) VALUES (?) ON DUPLICATE KEY UPDATE login_timestamp = CURRENT_TIMESTAMP';
//     connection.query(sql, [username], (err) => {
//       if (err) {
//         console.error('Error updating login timestamp in MySQL:', err);
//         return res.status(500).send('Error updating login timestamp.');
//       }
//       res.json({ message: 'Login successful' });
//     });
//   } else {
//     res.status(401).send('Invalid credentials');
//   }
// };


// Sign-up function
// Signup function
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  const checkUserQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
  connection.query(checkUserQuery, [username, email], async (err, results) => {
    if (err) {
      console.error('Error checking user in MySQL:', err);
      return res.status(500).send('Error checking user.');
    }

    if (results.length > 0) {
      return res.status(400).send('Username or email already exists.');
    }

    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user into the database
      const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      connection.query(sql, [username, email, hashedPassword], (err) => {
        if (err) {
          console.error('Error saving user to MySQL:', err);
          return res.status(500).send('Error saving user.');
        }

        res.json({ message: 'User registered successfully' });
      });
    } catch (err) {
      console.error('Error during password hashing:', err);
      return res.status(500).send('Error during password hashing.');
    }
  });
};

// Login function
exports.login = (req, res) => {
    const { username, password } = req.body;  // 'username' here is actually the email.
  
    // Update the SQL query to look for the email instead of the username
    const sql = 'SELECT * FROM users WHERE email = ?';
    connection.query(sql, [username], async (err, results) => {
      if (err) {
        console.error('Error fetching user from MySQL:', err);
        return res.status(500).send('Error fetching user.');
      }
  
      if (results.length === 0) {
        return res.status(401).send('Invalid email or password.');
      }
  
      const user = results[0];
  
      // Compare the provided password with the hashed password stored in the database
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).send('Invalid email or password.');
      }
  
      // Log user login timestamp
      const loginSql = 'INSERT INTO user_logins (username) VALUES (?) ON DUPLICATE KEY UPDATE login_timestamp = CURRENT_TIMESTAMP';
      connection.query(loginSql, [user.username], (err) => { // Use the username (not email) here
        if (err) {
          console.error('Error updating login timestamp in MySQL:', err);
          return res.status(500).send('Error updating login timestamp.');
        }
        res.json({ message: 'Login successful' });
      });
    });
  };
  