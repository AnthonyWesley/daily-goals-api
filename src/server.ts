import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { daySalesRoute } from "./routes/DaySalesRoute";
import { goalRouter } from "./routes/GoalRoute";
import { userRouter } from "./routes/UserRoute";

dotenv.config();

const server = express();

server.use(
  cors({
    origin: "https://daily-goals-api.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

server.use(express.json());

server.use(userRouter);
server.use(goalRouter);
server.use(daySalesRoute);

server.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.ip;
  res.send(ip);
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
