import { addUser, findUserByUsername } from "../controllers/users";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}
export const register = expressAsyncHandler(
  async (req: Request<{}, {}, RegisterPayload>, res: Response) => {
    const user = await addUser(req.body);
    res.status(StatusCodes.CREATED).json({ user });
  }
);

interface LoginPayload {
  username: string;
  password: string;
}
export const login = expressAsyncHandler(
  async (req: Request<{}, {}, LoginPayload>, res: Response) => {
    const user = await findUserByUsername(req.body.username);
    if (!user) {
      throw new Error("User not found");
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      throw new Error("Wrong Credentials");
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(StatusCodes.OK).json({ accessToken });
  }
);
