import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/chat", (req, res) => {
  const text = req.body.text;
  const createdAt = req.body.createdAt;

  res.send({
    text: text,
    createdAt: createdAt,
  });
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("onSendChat", ({ text, createdAt }) => {
    io.emit("onSendChat", { text, createdAt });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
