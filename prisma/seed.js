const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { GraphQLClient, gql } = require('graphql-request');
const userData = require('./mahasiswa.json');

const cmsClient = new GraphQLClient(process.env.CMS_ENDPOINT, {
  headers: {
    authorization: `Bearer ${process.env.CMS_API_KEY}`,
  },
});

const load = async () => {
  if (!process.argv.includes('--force')) {
    console.log('You must pass --force to seed the database');
    process.exit(1);
  }
  try {
    await prisma.user
      .deleteMany()
      .then(({ count }) => console.log(`Deleted ${count} users`));

    await prisma.storedUser
      .deleteMany()
      .then(({ count }) => console.log(`Deleted ${count} stored users`));

    await prisma.event
      .deleteMany()
      .then(({ count }) => console.log(`Deleted ${count} events`));

    await prisma.milestone
      .deleteMany()
      .then(({ count }) => console.log(`Deleted ${count} milestone groups`));

    await prisma.milestone
      .createMany({
        data: Array(23)
          .fill(0)
          .map((_, i) => ({ id: i + 1 })),
      })
      .then(() => console.log('Created all milestones group'));

    await prisma.storedUser
      .createMany({
        data: userData.map((user) => ({
          email: user.nim + '@std.stei.itb.ac.id',
          milestoneGroup: user.kelompok,
        })),
      })
      .then(({ count }) => console.log(`Created ${count} stored users`));

    const res = await cmsClient.request(gql`
      query {
        events {
          data {
            attributes {
              slug
            }
          }
        }
      }
    `);
    const eventsSlug = res.events.data.map((e) => e.attributes.slug);

    await prisma.event
      .createMany({
        data: eventsSlug.map((slug) => ({
          slug,
          quota21: 0,
          quota20: 0,
          quota19: 0,
        })),
      })
      .then(({ count }) => console.log(`Created ${count} events`));
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
