const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.checkAuth = async (req, res, next) => {
  try {
    let token;

    // Check if Authorization header is present and starts with "Bearer"
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Extract token from header
      token = req.headers.authorization.split(" ")[1];
    }

    // If no token is found, return unauthorized
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    // Find user by ID from token payload
    const user = await User.findByPk(decoded.id, {
      include: "group",
    });

    // If user is not found, return unauthorized
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user to request object for use in subsequent middleware/controllers
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

exports.checkSuperAdmin = (req, res, next) => {
  try {
    // Check if user exists on request object (should be set by checkAuth middleware)
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // Check if user role is SuperAdmin
    if (req.user.role !== "SuperAdmin") {
      return res.status(403).json({
        message: "Access denied. Super admin privileges required.",
        userRole: req.user.role,
      });
    }

    next();
  } catch (error) {
    console.error("SuperAdmin check error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.checkRole = (allowedRoles) => {
  return (req, res, next) => {
    try {
      // Check if user exists on request object
      if (!req.user) {
        return res.status(401).json({ message: "Authentication required" });
      }

      // Convert single role to array for consistency
      const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

      // Check if user's role is in the allowed roles
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Access denied. Insufficient privileges.",
          userRole: req.user.role,
          requiredRoles: roles,
        });
      }

      next();
    } catch (error) {
      console.error("Role check error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
