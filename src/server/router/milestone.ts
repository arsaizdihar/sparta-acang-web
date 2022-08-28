import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createProtectedRouter } from './protected-router';

export const milestoneRouter = createProtectedRouter()
  .mutation('vote', {
    input: z.object({
      id: z.number().min(1).max(23),
    }),
    async resolve({ ctx, input }) {
      const user = ctx.session.user;

      if (input.id === user.milestoneGroup) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: "You can't vote for your own group",
        });
      }

      const isVoted = await ctx.prisma.milestoneVote.count({
        where: { userId: user.id },
      });

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
  })
  .query('getVote', {
    async resolve({ ctx }) {
      const milestoneVote = await ctx.prisma.milestoneVote.findFirst({
        where: { userId: ctx.session.user.id },
        select: { milestoneId: true },
      });
      return { milestoneGroup: milestoneVote?.milestoneId };
    },
  });
