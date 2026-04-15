const { requireAuth, clerkMiddleware, getAuth } = require('@clerk/express');

const authMiddleware = (req, res, next) => {
  const middleware = clerkMiddleware();
  middleware(req, res, () => {
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
  const middleware = clerkMiddleware();
  middleware(req, res, () => {
    try {
      const auth = getAuth(req);
      req.userId = auth ? auth.userId : null;
    } catch (e) {}
    next();
  });
};

module.exports = { authMiddleware, optionalAuth };
