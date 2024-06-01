import { createUserDto, loginDto } from "../dtos/users";
import { Router } from "express";
import { register, login, checkToken } from "../handlers/auth";
import { validateData } from "../middlewares/validation";
import { authorization } from "../middlewares/authorization";
export const router = Router();

router.route("/register").post(validateData(createUserDto), register);
router.route("/login").post(validateData(loginDto), login);
router.route("/check").get(authorization, checkToken);
