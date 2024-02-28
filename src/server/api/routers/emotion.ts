import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { type Emotion } from "~/types";

export const emotionRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        emotion_name: z.string(),
        emotion_colour: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const currentUser = ctx.currentUser;

      // Check if an emotion with this name already exists from this user
      const existingEmotion = await ctx.db.emotion.findFirst({
        where: {
          userID: currentUser,
          emotion_name: input.emotion_name,
        },
      });

      if (existingEmotion) {
        // return {
        //   exists: true,
        //   emotion: existingEmotion,
        // };
        throw new Error("Emotion already exists");
      }

      const newEmotion = await ctx.db.emotion.create({
        data: {
          userID: currentUser,
          emotion_name: input.emotion_name,
          emotion_colour: input.emotion_colour,
          count_in_month: 0,
          count_in_year: 0,
          last_used: new Date(),
          days_since_last_used: 0,
          created_at: new Date(),
        },
      });

      return {
        exists: false,
        emotion: newEmotion,
      };
    }),
  fetchByID: privateProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const emotion = await ctx.db.emotion.findFirst({
        where: {
          id: parseInt(input),
        },
        include: {
          days: true,
          months: true,
          user: true,
        },
      });

      if (!emotion) {
        throw new Error("Emotion not found");
      }

      return emotion as unknown as Emotion;
    }),
  fetchAll: privateProcedure.query(async ({ ctx }) => {
    const currentUser = ctx.currentUser;
    const emotions = await ctx.db.emotion.findMany({
      where: {
        userID: currentUser,
      },
      // include: {
      //   days: true,
      //   months: true,
      //   user: true,
      // },
    });

    return emotions as unknown as Emotion[];
  }),
});
