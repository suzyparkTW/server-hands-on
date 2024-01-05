import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/src/appRouters";

export const trpc = createTRPCReact<AppRouter>();
