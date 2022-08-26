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

    const participantCount = await ctx.prisma.participation.aggregate({
      where: {
        eventId: event.id,
      },
      _count: {
        userId: true,
      },
    });
    const user = ctx.session.user;

    const quotaTotal = event.quota19 + event.quota20 + event.quota21;

    if (participantCount._count.userId < quotaTotal) {
      return await ctx.prisma.participation.create({
        data: {
          userId: user.id,
          eventId: event.id,
        },
      });
    } else {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Quota full',
      });
    }
  },
});
