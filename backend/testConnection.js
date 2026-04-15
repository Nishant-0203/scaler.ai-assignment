#!/usr/bin/env node

/**
 * Database Connection Test Script
 * Tests the PostgreSQL connection and verifies Railway database setup
 * 
 * Run with: node testConnection.js
 */

require('dotenv').config();
const { Pool } = require('pg');

console.log('🔍 Database Connection Test\n');
console.log('=' .repeat(50));

// Validate environment variables
const DATABASE_URL = process.env.DATABASE_URL;
const DIRECT_URL = process.env.DIRECT_URL;

console.log('\n📋 Configuration Check:');
console.log(`✓ DATABASE_URL is ${DATABASE_URL ? 'set' : 'NOT SET'}`);
console.log(`✓ DIRECT_URL is ${DIRECT_URL ? 'set' : 'NOT SET'}`);

if (!DATABASE_URL) {
  console.error('\n❌ Error: DATABASE_URL is not configured');
  console.error('Please add DATABASE_URL to your .env file');
  process.exit(1);
}

// Extract connection info from URL (for logging, without password)
const urlObj = new URL(DATABASE_URL);
console.log(`\n🌐 Connection Details:`);
console.log(`  Host: ${urlObj.hostname}`);
console.log(`  Port: ${urlObj.port}`);
console.log(`  Database: ${urlObj.pathname.slice(1)}`);
console.log(`  User: ${urlObj.username}`);

/**
 * Test direct connection pool
 */
async function testDirectConnection() {
  console.log('\n📡 Testing Direct Connection (Pooling)...');
  
  const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // Railway uses self-signed certs
    },
  });

  try {
    // Test 1: Basic connection
    console.log('  • Testing pool connection...');
    const client = await pool.connect();
    console.log('  ✓ Pool connection successful');
    client.release();

    // Test 2: Execute query
    console.log('  • Testing query execution...');
    const result = await pool.query('SELECT NOW() as current_time, version()');
    console.log('  ✓ Query execution successful');
    
    // Test 3: Display server info
    console.log(`\n📊 Server Information:`);
    console.log(`  Server Time: ${result.rows[0].current_time}`);
    const pgVersion = result.rows[0].version.split(',')[0];
    console.log(`  PostgreSQL: ${pgVersion}`);

    // Test 4: Check database schema
    console.log('\n📦 Database Tables:');
    const tablesResult = await pool.query(`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = 'public' 
      ORDER BY tablename
    `);
    
    if (tablesResult.rows.length === 0) {
      console.log('  ⚠ No tables found. You may need to run migrations.');
    } else {
      tablesResult.rows.forEach(row => {
        console.log(`  • ${row.tablename}`);
      });
    }

    // Test 5: Connection pool statistics
    console.log(`\n📈 Connection Pool Status:`);
    console.log(`  Total connections: ${pool.totalCount}`);
    console.log(`  Idle connections: ${pool.idleCount}`);
    console.log(`  Waiting requests: ${pool.waitingCount}`);

    await pool.end();
    return true;
  } catch (err) {
    console.error('  ✗ Connection failed');
    console.error(`  Error: ${err.message}`);
    
    // Provide helpful error messages
    if (err.message.includes('ENOTFOUND')) {
      console.error('  → Host not found. Check your DATABASE_URL hostname');
    } else if (err.message.includes('ECONNREFUSED')) {
      console.error('  → Connection refused. Check host and port');
    } else if (err.message.includes('authentication failed')) {
      console.error('  → Authentication failed. Check username and password');
    } else if (err.message.includes('does not exist')) {
      console.error('  → Database does not exist. Check database name in URL');
    }
    
    try {
      await pool.end();
    } catch (e) {
      // Ignore cleanup errors
    }
    return false;
  }
}

/**
 * Test Prisma connection (if available)
 */
async function testPrismaConnection() {
  console.log('\n🔗 Testing Prisma Connection...');
  
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    console.log('  • Testing Prisma client initialization...');
    const result = await prisma.$queryRaw`SELECT NOW() as current_time`;
    console.log('  ✓ Prisma connection successful');
    
    // Get table count
    const tableCountResult = await prisma.$queryRaw`
      SELECT COUNT(*) as count FROM pg_tables 
      WHERE schemaname = 'public'
    `;
    const tableCount = tableCountResult[0].count;
    console.log(`  ✓ Found ${tableCount} table(s)`);
    
    await prisma.$disconnect();
    return true;
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      console.log('  ⓘ Prisma not installed (optional)');
      return true;
    }
    console.error('  ✗ Prisma connection failed');
    console.error(`  Error: ${err.message}`);
    return false;
  }
}

/**
 * Run all tests
 */
async function runTests() {
  console.log('\n' + '='.repeat(50) + '\n');
  
  const directSuccess = await testDirectConnection();
  const prismaSuccess = await testPrismaConnection();

  console.log('\n' + '='.repeat(50));
  console.log('\n✅ Test Summary:');
  console.log(`  Direct Connection (pg): ${directSuccess ? '✓ PASSED' : '✗ FAILED'}`);
  console.log(`  Prisma Connection: ${prismaSuccess ? '✓ PASSED' : '✗ FAILED'}`);

  if (directSuccess && prismaSuccess) {
    console.log('\n🎉 All tests passed! Database is ready to use.\n');
    process.exit(0);
  } else if (directSuccess || prismaSuccess) {
    console.log('\n⚠ Some tests failed. Check the errors above.\n');
    process.exit(1);
  } else {
    console.log('\n❌ Critical errors detected. Fix connection before proceeding.\n');
    process.exit(1);
  }
}

// Run tests with error handling
runTests().catch(err => {
  console.error('\n💥 Unexpected error:', err);
  process.exit(1);
});
