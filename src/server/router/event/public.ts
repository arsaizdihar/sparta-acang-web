import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { getEventParticipants } from '~/utils/server/participation';
import { createRouter } from '../context';

export const eventPublicRouter = createRouter().query('getEventParticipants', {
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
});
