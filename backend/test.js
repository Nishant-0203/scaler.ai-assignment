const { PrismaClient } = require('./node_modules/@prisma/client'); const p = new PrismaClient(); p.order.findMany().then(x => console.dir(x)).catch(console.error).finally(()=>p.$disconnect());
