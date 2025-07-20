// middleware/verifyRole.js

const checkRole = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(403).json({ message: 'Forbidden: Role not found' });
    }

    // Allow admin to access everything
    if (userRole === 'admin') {
      return next();
    }

    // Allow if role matches required
    if (userRole === requiredRole) {
      return next();
    }

    return res.status(403).json({ message: `Forbidden: ${requiredRole} role required` });
  };
};

module.exports = checkRole;
