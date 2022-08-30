import { NextApiHandler } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions as nextAuthOptions } from '~/pages/api/auth/[...nextauth]';
import { prisma } from '~/server/db/client';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ msg: 'Method not allowed' });
    return;
  }
  const slug = req.query.slug;
  if (slug !== 'basket' && slug !== 'futsal') {
    res.status(404).json({ msg: 'Event not found' });
    return;
  }

  const apiKey = req.headers.authorization;
  if (!process.env.API_KEY || apiKey !== process.env.API_KEY) {
    const session = await unstable_getServerSession(req, res, nextAuthOptions);
    if (
      !session ||
      !session.user ||
      !(await prisma.user.findUnique({ where: { id: session.user.id } }))
        ?.isAdmin
    ) {
      res.status(403).end();
      return;
    }
  }

  const participants = await prisma.participation.findMany({
    select: {
      user: { select: { email: true, name: true, classYear: true } },
      createdAt: true,
    },
    orderBy: { createdAt: 'asc' },
    where: {
      eventSlug: slug,
    },
  });
  return res.json(
    participants.map(({ user, createdAt }) => ({
      ...user,
      registeredAt: createdAt,
    })),
  );
};

export default handler;
