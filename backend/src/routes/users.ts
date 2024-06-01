import { createUserDto, updateUserDto } from "../dtos/users";
import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../handlers/users";
import { validateData } from "../middlewares/validation";
import { authorization } from "../middlewares/authorization";

export const router = Router();

router
  .route("/users")
  .post(authorization, validateData(createUserDto), createUser)
  .get(authorization, getUsers);
router
  .route("/users/:userId")
  .delete(authorization, deleteUser)
  .patch(authorization, validateData(updateUserDto), updateUser)
  .get(authorization, getUser);
