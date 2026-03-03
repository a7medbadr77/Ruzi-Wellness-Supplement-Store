const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const user = await User.create(email, password, fullName, 'customer');
    const token = jwt.sign({ id: user.id, userType: user.user_type }, process.env.JWT_SECRET);
    
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, userType: user.user_type }, process.env.JWT_SECRET);
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
