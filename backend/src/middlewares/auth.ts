import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import passport, { DoneCallback } from "passport";
import dotenv from "dotenv";
import { db } from "../index";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

dotenv.config();

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

interface JwtPayload {
  id: string;
}

passport.use(
  new Strategy(options, async (payload: JwtPayload, done: DoneCallback) => {
    try {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, payload.id));
      if (user.length === 0) {
        throw new Error("User not found");
      }
      done(null, user[0]);
    } catch (error) {
      done(error);
    }
  })
);
