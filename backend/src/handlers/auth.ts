import { addUser, findUserByUsername } from "../controllers/users";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import { createSecretKey } from "crypto";
import * as jose from "jose";
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
      throw new createHttpError.NotFound("User not found");
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      throw new createHttpError.Unauthorized("Wrong Credentials");
    }

    const accessToken = await new jose.SignJWT({
      id: user.id,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1 day")
      .sign(createSecretKey(process.env.JWT_SECRET, "utf-8"));

    res.status(StatusCodes.OK).json({ accessToken, role: user.role });
  }
);

export const checkToken = async (
  req: Request<{}, {}, { accessToken: string }>,
  res: Response
) => {
  res.status(StatusCodes.OK).json({ valid: true });
};
