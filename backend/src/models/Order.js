const pool = require('../config/database');

class Order {
  static async create(userId, items, totalAmount, deliveryAddress, phone) {
    const result = await pool.query(
      'INSERT INTO orders (user_id, items, total_amount, delivery_address, phone, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, JSON.stringify(items), totalAmount, deliveryAddress, phone, 'pending']
    );
    return result.rows[0];
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async getByUserId(userId) {
    const result = await pool.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    return result.rows;
  }

  static async getAll() {
    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    return result.rows;
  }

  static async updateStatus(id, status) {
    const result = await pool.query('UPDATE orders SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
    return result.rows[0];
  }
}

module.exports = Order;
