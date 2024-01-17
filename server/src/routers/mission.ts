import { z } from "zod";
import { client } from "../db/index.js";
import { publicProcedure, router } from "../trpc.js";

export const missionRouter = router({
  list: publicProcedure.query(async () => {
    const result = await client.query(`
      select info
        from mission
    `);

    return {
      list: result.rows[0],
    };
  }),
  byId: publicProcedure
    .input(z.object({ missionId: z.string() }))
    .query(async ({ input }) => {
      const missionId = input.missionId;

      const result = await client.query(`
        select info
          from mission
          where id = $1
      `, [missionId]);

      return result.rows
    }),
});
