import { db } from "../index";
import { users } from "../db/schema";
import { CreateUserPayload, UpdateUserPayload } from "../handlers/users";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const findUserById = async (userId: string) => {
  const user = await db.select().from(users).where(eq(users.id, userId));
  const singleUser = user[0];
  return singleUser;
};

export const findUserByUsername = async (userUsername: string) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.username, userUsername));
  const singleUser = user[0];
  return singleUser;
};

export const addUser = async (userInfo: CreateUserPayload) => {
  const { password } = userInfo;
  const hashedPassword = await bcrypt.hash(password, 10);
  userInfo.password = hashedPassword;
  const user = await db
    .insert(users)
    .values({ ...userInfo })
    .returning();
  return user;
};
export const removeUser = async (userId: string) => {
  const result = await db
    .delete(users)
    .where(eq(users.id, userId))
    .returning({ deletedId: users.id });
  return result;
};

export const findUsers = async () => {
  const usersFound = await db.select().from(users);
  return usersFound;
};

export const editUser = async (
  updateInfo: UpdateUserPayload,
  userId: string
) => {
  const updatedUser = await db
    .update(users)
    .set({ ...updateInfo })
    .where(eq(users.id, userId))
    .returning();
  return updatedUser;
};
