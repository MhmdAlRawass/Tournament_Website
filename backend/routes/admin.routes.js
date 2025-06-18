const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeAdmin } = require('../middleware/auth.middleware');

router.get('/dashboard', authenticateToken, authorizeAdmin, (req, res) => {
  res.json({ message: 'Welcome Admin', user: req.user });
});

module.exports = router;
