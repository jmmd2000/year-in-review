import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { type Event } from "~/types";

export const eventRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        event_name: z.string(),
        event_colour: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const currentUser = ctx.currentUser;

      // Check if an emotion with this name already exists from this user
      const existingEvent = await ctx.db.event.findFirst({
        where: {
          userID: currentUser,
          event_name: input.event_name,
        },
      });

      if (existingEvent) {
        throw new Error("Event already exists");
      }

      const newEvent = await ctx.db.event.create({
        data: {
          userID: currentUser,
          event_name: input.event_name,
          event_colour: input.event_colour,
          count_in_month: 0,
          count_in_year: 0,
          last_used: new Date(),
          days_since_last_used: 0,
          created_at: new Date(),
        },
      });

      return {
        exists: false,
        event: newEvent,
      };
    }),
  fetchByID: privateProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const event = await ctx.db.event.findFirst({
        where: {
          id: parseInt(input),
        },
        include: {
          days: true,
          months: true,
          user: true,
        },
      });

      if (!event) {
        throw new Error("Event not found");
      }

      return event as unknown as Event;
    }),
  fetchAll: privateProcedure.query(async ({ ctx }) => {
    const currentUser = ctx.currentUser;
    const events = await ctx.db.event.findMany({
      where: {
        userID: currentUser,
      },
      // include: {
      //   days: true,
      //   months: true,
      //   user: true,
      // },
    });

    return events as unknown as Event[];
  }),
});
