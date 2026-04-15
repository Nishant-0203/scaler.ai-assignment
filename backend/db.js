/**
 * PostgreSQL Connection Pool Configuration
 * Configured for Railway.app PostgreSQL with SSL support
 */

require('dotenv').config();
const { Pool } = require('pg');

// Parse DATABASE_URL to extract connection parameters
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set. Please configure your .env file.');
}

// Create connection pool with Railway-compatible SSL configuration
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    // Railway uses self-signed certificates, so we need to allow them
    rejectUnauthorized: false,
  },
  // Connection pool settings for optimal performance
  max: 20, // Maximum number of connections in pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Fail if connection takes longer than 2 seconds
});

/**
 * Error handling for pool
 */
pool.on('error', (err) => {
  console.error('Unexpected pool error:', err);
  // Optionally trigger alerts here for production monitoring
});

pool.on('connect', () => {
  console.log('New client connected to PostgreSQL');
});

pool.on('remove', () => {
  console.log('Client disconnected from PostgreSQL');
});

/**
 * Execute a parameterized query
 * @param {string} query - SQL query with $1, $2, etc. placeholders
 * @param {Array} params - Query parameters
 * @returns {Promise<object>} Query result
 */
async function query(queryText, params = []) {
  const client = await pool.connect();
  try {
    console.log(`Executing query: ${queryText.substring(0, 100)}...`);
    const result = await client.query(queryText, params);
    return result;
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  } finally {
    client.release();
  }
}

/**
 * Execute a query without parameters
 */
async function simpleQuery(queryText) {
  return query(queryText, []);
}

/**
 * Get a client for transaction handling
 */
async function getClient() {
  return pool.connect();
}

/**
 * Close the pool (useful for graceful shutdown)
 */
async function closePool() {
  console.log('Closing database connection pool...');
  await pool.end();
  console.log('Database connection pool closed');
}

/**
 * Test the database connection
 */
async function testConnection() {
  try {
    const result = await query('SELECT NOW() as current_time');
    console.log('✓ Database connection successful!');
    console.log('Current server time:', result.rows[0].current_time);
    return true;
  } catch (err) {
    console.error('✗ Database connection failed:', err.message);
    return false;
  }
}

module.exports = {
  pool,
  query,
  simpleQuery,
  getClient,
  closePool,
  testConnection,
};
