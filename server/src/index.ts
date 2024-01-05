import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { appRouter } from "./appRouters.js";
import { createContext } from "./trpc.js";
import cors from "cors";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { WebSocketServer } from "ws";

const app = express();

app.use((req, _res, next) => {
  // request logger
  console.log("⬅️ ", req.method, req.path, req.body ?? req.query);

  next();
});

app.use(
  "/trpc",
  cors<cors.CorsRequest>(),
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const PORT = 4000;
const server = app.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/trpc`);
});

export const wss = new WebSocketServer({ server: server });
const handler = applyWSSHandler({ wss, router: appRouter, createContext });

wss.on("connection", (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`);
  ws.once("close", () => {
    console.log(`➖➖ Connection (${wss.clients.size})`);
  });
});
console.log("✅ WebSocket Server listening on ws://localhost:4000");

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});
