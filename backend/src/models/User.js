const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(email, password, fullName, userType = 'customer') {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password, full_name, user_type) VALUES ($1, $2, $3, $4) RETURNING id, email, full_name, user_type',
      [email, hashedPassword, fullName, userType]
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async updateProfile(id, fullName, address, phone) {
    const result = await pool.query(
      'UPDATE users SET full_name = $1, address = $2, phone = $3 WHERE id = $4 RETURNING *',
      [fullName, address, phone, id]
    );
    return result.rows[0];
  }
}

module.exports = User;
