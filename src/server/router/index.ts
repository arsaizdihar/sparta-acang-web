// src/server/router/index.ts
import superjson from 'superjson';
import { createRouter } from './context';
import { eventRouter } from './event';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('', eventRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
