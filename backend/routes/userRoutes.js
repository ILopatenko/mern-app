//IMPORT block
const express = require('express');
const router = express.Router();
const {
  createNewUser,
  loginUser,
  readPersonalProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/register').post(createNewUser);
router.route('/login').post(loginUser);
router.route('/me').get(protect, readPersonalProfile);

module.exports = router;
