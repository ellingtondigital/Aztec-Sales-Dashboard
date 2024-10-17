const mysql = require('mysql');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { mysql: dbConfig, baseUrl } = require('../config');

// Create MySQL connection
const connection = mysql.createConnection(dbConfig);

// Nodemailer setup for sending emails
const transporter = nodemailer.createTransport({
  host: 'smtp.mandrillapp.com',
  port: 587,
  auth: {
    user: '',  // Mandrill API key
    pass: '',  // Mandrill API password
  },
});

// Forgot Password Handler
exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  // Check if user exists with the provided email
  const sql = 'SELECT * FROM users WHERE email = ?';
  connection.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];

    // Generate a password reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

    // Store the token in the database (you may want to hash the token for security)
    const updateSql = 'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?';
    connection.query(updateSql, [resetToken, resetTokenExpiry, email], (err) => {
      if (err) {
        console.error('Error saving reset token:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      // Send password reset email
      const resetLink = `${baseUrl}/reset-password?token=${resetToken}`;
    // const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
      const mailOptions = {
        from: 'pasidhu@visionarydv.com', // Change to the email from which you want to send
        to: email,
        subject: 'Password Reset Request',
        html: `<p>You requested a password reset. Please click the link below to reset your password:</p>
               <a href="${resetLink}">${resetLink}</a>
               <p>This link will expire in 1 hour.</p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ message: 'Error sending email' });
        }
        res.status(200).json({ message: 'Password reset link sent to your email' });
      });
    });
  });
};


// Password Reset Handler (optional, to actually update the password)
exports.resetPassword = (req, res) => {
  const { token, newPassword } = req.body;

  // Find the user with the reset token
  const sql = 'SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > ?';
  connection.query(sql, [token, Date.now()], async (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const user = results[0];
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    const updateSql = 'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE email = ?';
    connection.query(updateSql, [hashedPassword, user.email], (err) => {
      if (err) {
        console.error('Error updating password:', err);
        return res.status(500).json({ message: 'Server error' });
      }
      res.status(200).json({ message: 'Password reset successfully' });
    });
  });
};
