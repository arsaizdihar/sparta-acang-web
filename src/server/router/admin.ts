import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { FeatureFlag, featureFlags } from '~/utils/server/getFeatureFlag';
import { createProtectedRouter } from './protected-router';

export const adminRouter = createProtectedRouter()
  .middleware(({ ctx, next }) => {
    if (!ctx.session?.user.isAdmin) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next();
  })
  .query('getFeatureFlags', {
    async resolve({ ctx }) {
      return await ctx.prisma.featureFlag.findMany({
        orderBy: { name: 'asc' },
      });
    },
  })
  .query('exVoteCount', {
    async resolve({ ctx }) {
      return await ctx.prisma.milestone.findMany({
        orderBy: { votes: { _count: 'desc' } },
        select: {
          id: true,
          _count: { select: { votes: true } },
        },
      });
    },
  })
  .mutation('toggleFeature', {
    input: z.object({
      name: z.string().refine(function refine(n): n is FeatureFlag {
        return featureFlags.includes(n as any);
      }),
    }),
    async resolve({ input, ctx: { prisma, res } }) {
      const featureFlag = await prisma.featureFlag.findUnique({
        where: { name: input.name },
      });
      if (!featureFlag) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Feature flag not found',
        });
      }

      let listUnvalidate: string[] = [];

      switch (input.name) {
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
          break;
        case 'MILESTONE_VOTE':
          listUnvalidate = ['/sudoex'];
        default:
          break;
      }
      const result = await prisma.featureFlag.update({
        where: { name: input.name },
        data: { value: !featureFlag.value },
      });
      await Promise.all(listUnvalidate.map((path) => res?.revalidate(path)));

      return result;
    },
  });
