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

export const router = Router();

router
  .route("/users")
  .post(validateData(createUserDto), createUser)
  .get(getUsers);
router
  .route("/users/:userId")
  .delete(deleteUser)
  .patch(validateData(updateUserDto), updateUser)
  .get(getUser);
