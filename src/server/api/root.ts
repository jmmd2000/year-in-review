import { userRouter } from "~/server/api/routers/user";
import { createTRPCRouter } from "~/server/api/trpc";
import { dayRouter } from "./routers/day";
import { emotionRouter } from "./routers/emotion";
import { eventRouter } from "./routers/event";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  day: dayRouter,
  emotion: emotionRouter,
  event: eventRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
