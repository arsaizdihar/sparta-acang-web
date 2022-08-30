import { NextApiHandler } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions as nextAuthOptions } from '~/pages/api/auth/[...nextauth]';
import { prisma } from '~/server/db/client';
import { FeatureFlag, featureFlags } from '~/utils/server/getFeatureFlag';

const Schema = z.object({
  name: z.string().refine(function refine(n): n is FeatureFlag {
    return featureFlags.includes(n as any);
  }),
  value: z.boolean(),
});

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  if (
    !session ||
    !session.user ||
    !(await prisma.user.findUnique({ where: { id: session.user.id } }))?.isAdmin
  ) {
    res.status(403).end();
    return;
  }

  try {
    const body = Schema.parse(req.body);
    const { name, value } = body;
    const featureFlag = await prisma.featureFlag.findUnique({
      where: { name },
    });
    if (!featureFlag) {
      res.status(404).json({ error: 'Feature flag not found' });
    }

    let listUnvalidate: string[] = [];

    switch (name) {
      case 'MILESTONE_SHOW':
        listUnvalidate = [
          '/',
          '/sudoex',
          '/sudolympic/basket',
          '/sudolympic/futsal',
        ];
        break;
      case 'EVENT_REGISTER':
        listUnvalidate = ['/', '/sudolympic/basket', '/sudolympic/futsal'];
        break;
      case 'EVENT_KESAN':
        listUnvalidate = ['/sudolympic/basket', '/sudolympic/futsal'];
      case 'MILESTONE_VOTE':
        listUnvalidate = ['/sudoex'];
      default:
        break;
    }
    await Promise.all(listUnvalidate.map((path) => res.revalidate(path)));

    return res.json(
      await prisma.featureFlag.update({
        where: { name },
        data: { value },
      }),
    );
  } catch (err) {
    res.status(400).json(err);
    return;
  }
};

export default handler;
