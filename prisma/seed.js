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
  try {
    await prisma.user.deleteMany();
    console.log('Deleted records in user table');

    await prisma.event.deleteMany();
    console.log('Deleted records in event table');

    await prisma.milestone.deleteMany();
    console.log('Deleted records in milestone table');

    await prisma.milestone.createMany({
      data: Array(23)
        .fill(0)
        .map((_, i) => ({ id: i + 1 })),
    });
    console.log('Created all milestone groups');

    const usersRes = await prisma.user.createMany({
      data: userData.map((user) => ({
        classYear: 21,
        email: user.nim + '@std.stei.itb.ac.id',
        name: user.nama,
        milestoneGroup: user.kelompok,
        major: user.nim.startsWith('135') ? 'IF' : 'STI',
      })),
    });
    console.log(`Created ${usersRes.count} users`);

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

    const eventsRes = await prisma.event.createMany({
      data: eventsSlug.map((slug) => ({ slug, quota: 0 })),
    });

    console.log(`Created ${eventsRes.count} events`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
