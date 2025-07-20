const express = require('express');
const {
  saveUser,
  getUserRole,
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();


router.put('/save', saveUser);
router.get('/role/:email', getUserRole);
router.get('/', getAllUsers);
router.patch('/role/:id', updateUserRole);
router.delete('/:id', deleteUser);

module.exports = router;
