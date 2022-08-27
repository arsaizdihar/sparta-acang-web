import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { getEventParticipants } from '~/utils/server/participation';
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

    // check if user is already registered to one of all events
    const isParticipated = await ctx.prisma.user.count({
      where: { id: user.id, participation: { isNot: null } },
    });

    if (isParticipated) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'You already registered to one of the events',
      });
    }

    // disallow class of 2018
    if (user.classYear === 18) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Only class of 2019, 2020, and 2021 are allowed.',
      });
    }

    const { total, registered, classCount, classQuota } =
      await getEventParticipants(event);

    if (total < registered) {
      const isWaiting =
        classCount[user.classYear] <= classQuota[user.classYear];

      await ctx.prisma.participation.create({
        data: {
          userId: user.id,
          eventId: event.id,
        },
      });

      return { isWaiting };
    } else {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Quota full',
      });
    }
  },
});
