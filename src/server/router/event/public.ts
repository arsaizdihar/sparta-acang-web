import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { getEventParticipants } from '~/utils/server/participation';
import { createRouter } from '../context';

export const eventPublicRouter = createRouter()
  .query('getParticipants', {
    input: z.object({ slug: z.string() }),
    async resolve({ input, ctx }) {
      const event = await ctx.prisma.event.findUnique({
        where: { slug: input.slug },
      });

      if (!event) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Event not found' });
      }

      return await getEventParticipants(event);
    },
  })
  .query('getKesan', {
    input: z.object({
      slug: z.string(),
      page: z.number().min(1).int().default(1),
    }),
    async resolve({ input, ctx }) {
      const event = await ctx.prisma.event.findUnique({
        where: { slug: input.slug },
        select: { slug: true },
      });

      if (!event) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Event not found' });
      }

      const [kesanPesan, count] = await Promise.all([
        ctx.prisma.kesanPesan.findMany({
          where: { eventSlug: event.slug },
          skip: (input.page - 1) * 10,
          take: 10,
          select: {
            userId: true,
            text: true,
            user: { select: { name: true, image: true } },
            votesCount: true,
            upvotes: ctx.session?.user
              ? {
                  where: { id: ctx.session.user.id },
                  select: { id: true },
                }
              : undefined,
            downvotes: ctx.session?.user
              ? {
                  where: { id: ctx.session.user.id },
                  select: { id: true },
                }
              : undefined,
          },
        }),
        ctx.prisma.kesanPesan.count({ where: { eventSlug: event.slug } }),
      ]);

      return {
        kesanPesan: kesanPesan.map((k) => ({
          ...k,
          upvotes: undefined,
          downvotes: undefined,
          isUpvoted: !!k.upvotes?.[0],
          isDownvoted: !!k.downvotes?.[0],
        })),
        totalPages: Math.ceil(count / 10),
      };
    },
  });
