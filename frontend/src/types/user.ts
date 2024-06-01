import { z } from "zod";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export const UpdateUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(1),
  role: z.enum(["admin", "user"]),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
});
export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;

export const LoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z.string().email(),
  username: z.string().min(1),
  password: z.string().min(8),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const CreateUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(1),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  password: z.string().min(8),
});

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;
