import { z } from "zod";
import { publicProcedure, router } from "./trpc.js";
import EventEmitter from "events";
import { observable } from "@trpc/server/observable";
import { client } from "./db/index.js";

interface Chat {
  text: string;
  createdAt: string;
}

const eventEmitter = new EventEmitter();
const SEND_CHAT_EVENT_NAME = "sendChat";

export const appRouter = router({
  missionList: publicProcedure.query(async () => {
    const result = await client.query('select id, date, info from mission')
    return {
      missionList: result
    }
  }),
  helloWorld: publicProcedure.query(() => {
    return {
      message: "hello world",
    };
  }),
  sendChat: publicProcedure
    .input(z.object({ text: z.string().min(1), createdAt: z.string() }))
    .mutation(async (opts) => {
      const chat = { ...opts.input };

      eventEmitter.emit(SEND_CHAT_EVENT_NAME, chat);
      return chat;
    }),
  onSendChat: publicProcedure.subscription(() => {
    return observable<Chat>((emit) => {
      const onSendChat = (data: Chat) => {
        // emit data to client
        emit.next(data);
      };
      // trigger `onAdd()` when `add` is triggered in our event emitter
      eventEmitter.on(SEND_CHAT_EVENT_NAME, onSendChat);
      // unsubscribe function when client disconnects or stops subscribing
      return () => {
        eventEmitter.off(SEND_CHAT_EVENT_NAME, onSendChat);
      };
    });
  }),
});

export type AppRouter = typeof appRouter;
