import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createProtectedRouter } from './protected-router';

export const milestoneRouter = createProtectedRouter().mutation('vote', {
  input: z.object({
    id: z.number().min(1).max(23),
  }),
  async resolve({ ctx, input }) {
    const user = ctx.session.user;
    const isVoted =
      (await ctx.prisma.milestoneVote.count({
        where: { userId: user.id },
      })) > 0;
    if (isVoted) {
      throw new TRPCError({
        message: 'You have voted',
        code: 'BAD_REQUEST',
      });
    }
    await ctx.prisma.milestoneVote.create({
      data: { userId: user.id, milestoneId: input.id },
    });
    return true;
  },
});
