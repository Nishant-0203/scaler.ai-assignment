const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  const t = await prisma.$queryRaw`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'order_items'`;
  console.log(t);
  process.exit();
}
test();