// src/server/router/index.ts
import superjson from 'superjson';
import { adminRouter } from './admin';
import { createRouter } from './context';
import { eventProtectedRouter } from './event/protected';
import { eventPublicRouter } from './event/public';
import { milestoneRouter } from './milestone';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('event.', eventProtectedRouter)
  .merge('event.', eventPublicRouter)
  .merge('milestone.', milestoneRouter)
  .merge('admin.', adminRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
