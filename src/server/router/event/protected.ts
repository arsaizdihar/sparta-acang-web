import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { getFeatureFlag } from '~/utils/server/getFeatureFlag';
import { getUserParticipation } from '~/utils/server/participation';
import { createProtectedRouter } from '../protected-router';

export const eventProtectedRouter = createProtectedRouter()
  .mutation('register', {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ input, ctx }) {
      const enableEventRegister = await getFeatureFlag('EVENT_REGISTER');

      if (!enableEventRegister) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Event registration is not enabled',
        });
      }

      const event = await ctx.prisma.event.findFirst({
        where: { slug: input.slug },
      });

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

      const classQuota = event[`quota${user.classYear}`];
      const classRegistered = await ctx.prisma.participation.count({
        where: { eventSlug: event.slug, user: { classYear: user.classYear } },
      });

      const isWaiting = classRegistered >= classQuota;

      await ctx.prisma.participation.create({
        data: {
          userId: user.id,
          eventSlug: event.slug,
        },
      });

      return { isWaiting };
    },
  })
  .mutation('unregister', {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ input, ctx }) {
      const enableEventRegister = await getFeatureFlag('EVENT_REGISTER');

      if (!enableEventRegister) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Event registration is not enabled',
        });
      }
      const isParticipated = await ctx.prisma.participation.count({
        where: { userId: ctx.session.user.id, eventSlug: input.slug },
      });
      if (!isParticipated) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'You are not registered to this event',
        });
      }

      return await ctx.prisma.participation.delete({
        where: {
          userId: ctx.session.user.id,
        },
      });
    },
  })
  .mutation('addKesanPesan', {
    input: z.object({
      eventSlug: z.string(),
      text: z.string().min(1),
    }),
    async resolve({ input, ctx }) {
      const user = ctx.session.user;

      const enableKesanPesan = await getFeatureFlag('EVENT_KESAN');

      if (!enableKesanPesan) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Kesan pesan is not enabled',
        });
      }

      const isParticipant = await ctx.prisma.participation.count({
        where: { userId: user.id, eventSlug: input.eventSlug },
      });

      if (!isParticipant) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Only participants can add kesan/pesan.',
        });
      }

      const isAlreadyAdded = await ctx.prisma.kesanPesan.count({
        where: { userId: user.id, eventSlug: input.eventSlug },
      });

      if (isAlreadyAdded) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'You already added kesan/pesan.',
        });
      }

      return await ctx.prisma.kesanPesan.create({
        data: {
          text: input.text,
          userId: user.id,
          eventSlug: input.eventSlug,
        },
      });
    },
  })
  .query('getRegistered', {
    async resolve({ ctx }) {
      return await getUserParticipation(ctx.session.user);
    },
  })
  .mutation('upvoteKesan', {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const user = ctx.session.user;

      const kesan = await ctx.prisma.kesanPesan.findUnique({
        where: { userId: input.userId },
      });

      if (!kesan) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Kesan not found',
        });
      }

      const [isUpvoted, isDownvoted] = await Promise.all([
        ctx.prisma.user.count({
          where: { id: user.id, upvotes: { some: { userId: input.userId } } },
        }),
        ctx.prisma.user.count({
          where: { id: user.id, downvotes: { some: { userId: input.userId } } },
        }),
      ]);

      if (isUpvoted) {
        await ctx.prisma.kesanPesan.update({
          where: { userId: input.userId },
          data: {
            upvotes: { disconnect: { id: user.id } },
            votesCount: { decrement: 1 },
          },
        });

        return { isUpvoted: false };
      }

      await ctx.prisma.kesanPesan.update({
        where: { userId: input.userId },
        data: {
          upvotes: { connect: { id: user.id } },
          votesCount: { increment: isDownvoted ? 2 : 1 },
          downvotes: isDownvoted ? { disconnect: { id: user.id } } : undefined,
        },
      });

      return { isUpvoted: true };
    },
  })
  .mutation('downvoteKesan', {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const user = ctx.session.user;

      const kesan = await ctx.prisma.kesanPesan.findUnique({
        where: { userId: input.userId },
      });

      if (!kesan) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Kesan not found',
        });
      }

      const [isUpvoted, isDownvoted] = await Promise.all([
        ctx.prisma.user.count({
          where: { id: user.id, upvotes: { some: { userId: input.userId } } },
        }),
        ctx.prisma.user.count({
          where: { id: user.id, downvotes: { some: { userId: input.userId } } },
        }),
      ]);

      if (isDownvoted) {
        await ctx.prisma.kesanPesan.update({
          where: { userId: input.userId },
          data: {
            downvotes: { disconnect: { id: user.id } },
            votesCount: { increment: 1 },
          },
        });

        return { isDownvoted: false };
      }

      await ctx.prisma.kesanPesan.update({
        where: { userId: input.userId },
        data: {
          downvotes: { connect: { id: user.id } },
          votesCount: { decrement: isUpvoted ? 2 : 1 },
          upvotes: isUpvoted ? { disconnect: { id: user.id } } : undefined,
        },
      });

      return { isDownvoted: true };
    },
  });
