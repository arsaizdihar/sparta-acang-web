// src/server/router/index.ts
import superjson from 'superjson';
import { createRouter } from './context';
import { eventRouter } from './event';
import { milestoneRouter } from './milestone';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('', eventRouter)
  .merge('milestone.', milestoneRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
