import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createProtectedRouter } from './protected-router';

export const eventRouter = createProtectedRouter().mutation('registerEvent', {
  input: z.object({
    id: z.string(),
  }),
  async resolve({ input, ctx }) {
    const event = await ctx.prisma.event.findFirst({ where: { id: input.id } });

    if (!event) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Event not found' });
    }

    const user = ctx.session.user;

    // disallow class of 2018
    if (user.classYear === 18) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Only class of 2019, 2020, and 2021 are allowed.',
      });
    }

    // get participant count for each class year
    const participantCount = await ctx.prisma.user.groupBy({
      by: ['classYear'],
      where: {
        participation: { isNot: null },
      },
      _count: true,
    });

    // participants quota for each class
    const classQuota = {
      21: event.quota21,
      20: event.quota20,
      19: event.quota19,
    };

    // participants count for each class
    const classCount = {
      21: event.quota21,
      20: event.quota20,
      19: event.quota19,
    };

    // count the 'non waiting' participants for each class
    for (const { _count, classYear } of participantCount) {
      // @ts-ignore
      classCount[classYear] = min(_count, classCount[classYear]);
    }

    const quotaTotal = Object.values(classQuota).reduce((a, b) => a + b, 0);

    // total 'non waiting' participants
    const quotaUsed = Object.values(classCount).reduce((a, b) => a + b, 0);

    if (quotaUsed < quotaTotal) {
      await ctx.prisma.participation.create({
        data: {
          userId: user.id,
          eventId: event.id,
        },
      });
      const isWaiting =
        classCount[user.classYear] <= classQuota[user.classYear];

      return { isWaiting };
    } else {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Quota full',
      });
    }
  },
});
