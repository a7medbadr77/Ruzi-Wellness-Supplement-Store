const pool = require('../config/database');

class Product {
  static async create(name, description, category, price, quantity, image) {
    const result = await pool.query(
      'INSERT INTO products (name, description, category, price, quantity, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, category, price, quantity, image]
    );
    return result.rows[0];
  }

  static async getAll() {
    const result = await pool.query('SELECT * FROM products WHERE quantity > 0');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async update(id, name, description, category, price, quantity, image) {
    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, category = $3, price = $4, quantity = $5, image = $6 WHERE id = $7 RETURNING *',
      [name, description, category, price, quantity, image, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
  }

  static async getByCategory(category) {
    const result = await pool.query('SELECT * FROM products WHERE category = $1 AND quantity > 0', [category]);
    return result.rows;
  }
}

module.exports = Product;
