const { requireAuth, clerkMiddleware } = require('@clerk/express');

try {
  var authMiddleware = (req, res, next) => {
    requireAuth()(req, res, (err) => {
      if (err) return next(err);
      req.userId = req.auth?.userId;
      next();
    });
  };
} catch(e) {
  console.log(e);
}

const optionalAuth = (req, res, next) => {
  clerkMiddleware()(req, res, (err) => {
    if (err) return next(err);
    req.userId = req.auth?.userId;
    next();
  });
};

module.exports = { authMiddleware, optionalAuth };
