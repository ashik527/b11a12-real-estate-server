const User = require('../models/User');

// Save or update user on login/register
exports.saveUser = async (req, res) => {
  const { name, email, photo } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(200).json(existing);

    const newUser = await User.create({ name, email, photo });
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Save User Error:', err);
    res.status(500).json({ error: 'Failed to save user' });
  }
};

// Get role by email
exports.getUserRole = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ role: user.role || 'user' });
  } catch (err) {
    console.error('Get Role Error:', err);
    res.status(500).json({ error: 'Failed to get user role' });
  }
};

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Get All Users Error:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Update user role: 'admin', 'agent', 'fraud', etc.
exports.updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!role) return res.status(400).json({ error: 'Role is required' });

  try {
    const updated = await User.findByIdAndUpdate(id, { role }, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('Update Role Error:', err);
    res.status(500).json({ error: 'Failed to update role' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error('Delete User Error:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
