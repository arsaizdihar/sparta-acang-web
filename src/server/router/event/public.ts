import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { getEventParticipants } from '~/utils/server/participation';
import { createRouter } from '../context';

export const eventPublicRouter = createRouter()
  .query('getParticipants', {
    input: z.object({ id: z.string() }),
    async resolve({ input, ctx }) {
      const event = await ctx.prisma.event.findUnique({
        where: { id: input.id },
      });

      if (!event) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Event not found' });
      }

      return await getEventParticipants(event);
    },
  })
  .query('getKesan', {
    input: z.object({
      id: z.string(),
      page: z.number().min(1).int().default(1),
    }),
    async resolve({ input, ctx }) {
      const event = await ctx.prisma.event.findUnique({
        where: { id: input.id },
        select: { id: true },
      });

      if (!event) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Event not found' });
      }

      const kesan = await ctx.prisma.kesanPesan.findMany({
        where: { eventId: event.id },
        skip: (input.page - 1) * 10,
        take: 10,
        select: { userId: true, text: true, user: { select: { name: true } } },
      });

      return kesan;
    },
  });
