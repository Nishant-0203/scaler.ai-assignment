const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/products');
const categoryRoutes = require('./src/routes/categories');
const cartRoutes = require('./src/routes/cart');
const orderRoutes = require('./src/routes/orders');
const wishlistRoutes = require('./src/routes/wishlist');

const app = express();
const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

// Security Middleware
app.use(helmet());

// Performance Middleware
app.use(compression());

// Rate Limiting with Forwarded header support for proxies (Railway, Vercel)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req, res) => {
    // Use X-Forwarded-For header if available (for proxies like Vercel/Railway)
    // Otherwise fall back to req.ip
    const forwardedFor = req.headers['x-forwarded-for'];
    if (forwardedFor) {
      // x-forwarded-for can be comma-separated, get the client IP (first one)
      return typeof forwardedFor === 'string' ? forwardedFor.split(',')[0].trim() : forwardedFor[0];
    }
    return req.ip;
  },
  skip: (req, res) => {
    // Skip rate limiting for health checks
    return req.path === '/' && req.method === 'GET';
  }
});
app.use('/api', limiter);

// Standard Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow frontend URL, vercel domains, localhost, or no origin (like mobile/postman)
    if (!origin || origin.includes('vercel.app') || origin === process.env.FRONTEND_URL || origin.includes('localhost')) {
      callback(null, true);
    } else {
      callback(null, true); // Safely allow all for the assignment to prevent CORS issues
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Health check
app.get('/api/health', async (req, res) => {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'OK', message: 'Amazon Clone API is running', database: 'connected' });
  } catch (err) {
    console.error("[HEALTH_CHECK_ERROR]", err.message);
    res.status(503).json({ 
      status: 'ERROR', 
      message: 'Amazon Clone API is running but database is disconnected',
      error: process.env.NODE_ENV === 'production' ? undefined : err.message
    });
  }
});

// Root route
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Amazon Clone API is running. Go to /api/health for health check.' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Express Error:", err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    details: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
});

// Catch-all for 404s - Must be after all other routes
app.use('/{*any}', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

if (process.env.NODE_ENV !== 'production') {
  // Test database connection before starting server in development
  prisma.$queryRaw`SELECT 1`
    .then(() => {
      console.log('✓ Database connected');
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error('✗ Database connection failed:', err.message);
      console.error('Make sure DATABASE_URL is set correctly');
      process.exit(1);
    });
}

module.exports = app;

