const express = require('express');
const { registerUser, loginUser } = require('../controller/authController');
const { auth, isAdmin } = require('../middlewares/authMiddlewares');


const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);


router.get('/admin-dashboard', auth, isAdmin, (req, res) => {
  res.status(200).json({ message: 'Welcome to the admin dashboard' });
});

module.exports = router;
