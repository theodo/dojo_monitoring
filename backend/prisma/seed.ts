import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  const user = await prisma.user.create({
    data: {
      name: 'John NoWeak',
      createdParticlesCount: 0,
      createdGravityPointsCount: 0,
      gravityPointCollisionsCount: 0,
    },
  });
  console.log(`Created user with id: ${user.id}`);

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
