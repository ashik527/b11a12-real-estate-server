const express = require('express');
const {
  saveUser,
  getUserRole,
  getAllUsers,
  updateUserRole,
  deleteUser,
  generateToken,
} = require('../controllers/userController');

const router = express.Router();


router.put('/save', saveUser);
router.get('/role/:email', getUserRole);
router.get('/', getAllUsers);
router.patch('/role/:id', updateUserRole);
router.delete('/:id', deleteUser);
router.post('/jwt', generateToken);

module.exports = router;
