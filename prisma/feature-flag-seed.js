const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const load = async () => {
  if (!process.argv.includes('--force')) {
    console.log('You must pass --force to seed the database');
    process.exit(1);
  }
  try {
    await prisma.featureFlag.deleteMany();

    await prisma.featureFlag.createMany({
      data: [
        { name: 'MILESTONE_SHOW', value: false },
        { name: 'MILESTONE_VOTE', value: false },
        { name: 'EVENT_REGISTER', value: false },
        { name: 'EVENT_KESAN', value: false },
        { name: 'DONATION', value: false },
      ],
    });
    console.log('Seeded feature flags');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
