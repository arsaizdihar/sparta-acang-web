// src/server/router/index.ts
import superjson from 'superjson';
import { createRouter } from './context';
import { eventProtectedRouter } from './event/protected';
import { milestoneRouter } from './milestone';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('event.', eventProtectedRouter)
  .merge('milestone.', milestoneRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
