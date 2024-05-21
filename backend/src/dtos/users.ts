import z from "zod";

export const createUserDto = z.object({
  email: z.string().email(),
  username: z.string().min(1),
  password: z.string().min(8),
});

export const updateUserDto = z.object({
  email: z.string().email().optional(),
  username: z.string().min(1).optional(),
  password: z.string().min(8).optional(),
});

export const loginDto = z.object({
  username: z.string().min(1),
  password: z.string().min(8),
});
