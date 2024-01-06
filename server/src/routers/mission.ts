import { client } from "../db/index.js";
import { publicProcedure, router } from "../trpc.js";

export const missionRouter = router({
  list: publicProcedure.query(async () => {
    const result = await client.query("select id, date, info from mission");

    return {
      list: result.rows,
    };
  }),
});
