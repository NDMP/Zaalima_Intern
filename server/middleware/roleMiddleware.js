const VALID_ROLES = new Set(['CUSTOMER', 'VENDOR', 'SUPER_ADMIN']);

const authorizeRoles = (...allowedRoles) => {
  const hasValidConfiguration =
    allowedRoles.length > 0 && allowedRoles.every((role) => VALID_ROLES.has(role));

  return (req, res, next) => {
    if (!hasValidConfiguration) {
      return res.status(500).json({
        success: false,
        message: 'Authorization middleware is misconfigured',
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: insufficient permissions',
      });
    }

    return next();
  };
};

module.exports = { authorizeRoles };
