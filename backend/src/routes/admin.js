const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const Product = require('../models/Product');

const router = express.Router();

// Add product
router.post('/products', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, description, category, price, quantity, image } = req.body;
    const product = await Product.create(name, description, category, price, quantity, image);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product
router.put('/products/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, description, category, price, quantity, image } = req.body;
    const product = await Product.update(req.params.id, name, description, category, price, quantity, image);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete product
router.delete('/products/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Product.delete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
