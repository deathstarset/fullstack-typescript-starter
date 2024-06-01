import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import expressAsyncHandler from "express-async-handler";
import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { router as usersRouter } from "./routes/users";
import { router as authRouter } from "./routes/auth";

import { errorHandler } from "./middlewares/error";

dotenv.config();

interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}
declare module "express-serve-static-core" {
  interface Request {
    user: User;
  }
}
const app: Express = express();
const port = process.env.PORT || 3000;

const client = new Client({
  connectionString: process.env.DB_URL,
});
export const db = drizzle(client);
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 300,
  })
);
app.get(
  "/",
  expressAsyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({ message: "Fullstack starter" });
  })
);
app.use("/api/v1", usersRouter);
app.use("/api/v1/auth", authRouter);
app.use(errorHandler);
app.listen(port, async () => {
  console.log("Server Listening On Port " + port);
  await client.connect();
  console.log("Database Connected Succefully");
});
