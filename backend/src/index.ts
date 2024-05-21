import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import expressAsyncHandler from "express-async-handler";
import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { router as usersRouter } from "./routes/users";
import { router as authRouter } from "./routes/auth";
import { StatusCodes } from "http-status-codes";
import passport from "passport";
import "./middlewares/auth";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

const client = new Client({
  connectionString: process.env.DB_URL,
});
export const db = drizzle(client);
app.use(passport.initialize());
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
app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  expressAsyncHandler(async (req: Request, res: Response) => {
    console.log(req.user);
    res.status(StatusCodes.OK).json({ message: "protected" });
  })
);
app.listen(port, async () => {
  console.log("Server Listening On Port " + port);
  await client.connect();
  console.log("Database Connected Succefully");
});
