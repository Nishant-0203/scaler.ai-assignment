const { requireAuth, clerkMiddleware, getAuth } = require('@clerk/express');

const authMiddleware = (req, res, next) => {
  clerkMiddleware()(req, res, (err) => {
    if (err) return next(err);
    
    // Once middleware runs, we need to manually require authentication
    // or use getAuth to retrieve details.
    try {
      const auth = getAuth(req);
      if (!auth || !auth.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.userId = auth.userId;
      next();
    } catch (authErr) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  });
};

const optionalAuth = (req, res, next) => {
  clerkMiddleware()(req, res, (err) => {
    if (err) return next(err);
    try {
      const auth = getAuth(req);
      req.userId = auth ? auth.userId : null;
    } catch (e) {}
    next();
  });
};

module.exports = { authMiddleware, optionalAuth };
