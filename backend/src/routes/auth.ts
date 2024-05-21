import { createUserDto, loginDto } from "../dtos/users";
import { Router } from "express";
import { register, login } from "../handlers/auth";
import { validateData } from "../middlewares/validation";

export const router = Router();

router.route("/register").post(validateData(createUserDto), register);
router.route("/login").post(validateData(loginDto), login);
