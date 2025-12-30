const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  registerValidation, 
  loginValidation, 
  profileUpdateValidation,
  validate 
} = require('../middleware/validation');
const {
  register,
  login,
  getProfile,
  updateProfile
} = require('../controllers/authController');

// Public routes
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, profileUpdateValidation, validate, updateProfile);

module.exports = router;
