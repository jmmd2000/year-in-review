import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        first_name: z.string().or(z.null()),
        last_name: z.string().or(z.null()),
        avatar_url: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const currentUser = ctx.currentUser;

      // Check if a user with this google_id already exists
      const existingUser = await ctx.db.user.findUnique({
        where: { google_id: currentUser },
      });

      if (existingUser) {
        return {
          exists: true,
          user: existingUser,
        };
      }

      const newUser = await ctx.db.user.create({
        data: {
          google_id: currentUser,
          first_name: input.first_name,
          last_name: input.last_name,
          avatar_url: input.avatar_url,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      return {
        exists: false,
        user: newUser,
      };
    }),
});
