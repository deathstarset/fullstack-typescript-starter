import { createSecretKey } from "crypto";
import { findUserById } from "../controllers/users";
import { Request, Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import createHttpError from "http-errors";
import * as jose from "jose";

export const authorization = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    const accessToken = authorization.split(" ")[1];
    if (!authorization.startsWith("Bearer") || !accessToken) {
      throw new createHttpError.Unauthorized();
    }
    const result: jose.JWTVerifyResult<{ id: string }> = await jose.jwtVerify(
      accessToken,
      createSecretKey(process.env.JWT_SECRET, "utf-8")
    );
    const user = await findUserById(result.payload.id);
    console.log(user);
    req.user = user;
    next();
  }
);
