import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { equipos } from "~/server/db/schema";

export const equiposRouter = createTRPCRouter({
  list: publicProcedure.query(({ input, ctx }) => {
    const equipo = ctx.db.query.equipos.findMany();
    return equipo;
  }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(equipos).values({
        name: input.name,
      });
    }),

  editar: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(equipos)
        .set({
          id: input.id,
          name: "Editado",
        })
        .where(eq(equipos.id, input.id));
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const equipos = await ctx.db.query.equipos.findFirst({
      orderBy: (equipos, { desc }) => [desc(equipos.createdAt)],
    });

    return equipos ?? null;
  }),
});
