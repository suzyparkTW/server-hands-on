import { missionRouter } from "./mission.js";
import { router } from "../trpc.js";
import { exampleRouter } from "./example.js";

export const appRouter = router({
  mission: missionRouter,
  example: exampleRouter,
});

export type AppRouter = typeof appRouter;
