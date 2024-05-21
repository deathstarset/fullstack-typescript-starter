import expressAsyncHandler from "express-async-handler";
import { Response, Request } from "express";
import {
  addUser,
  editUser,
  findUsers,
  removeUser,
  findUserById,
} from "../controllers/users";
import { StatusCodes } from "http-status-codes";

export interface CreateUserPayload {
  email: string;
  username: string;
  password: string;
}
export const createUser = expressAsyncHandler(
  async (req: Request<{}, {}, CreateUserPayload>, res: Response) => {
    const user = await addUser(req.body);

    res.status(StatusCodes.CREATED).json({ user });
  }
);
export const deleteUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await removeUser(userId);
    res.status(StatusCodes.OK).json({ result });
  }
);
export const getUsers = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const users = await findUsers();
    res.status(StatusCodes.OK).json({ users });
  }
);

export interface UpdateUserPayload {
  email?: string;
  username?: string;
  password?: string;
}
export const updateUser = expressAsyncHandler(
  async (
    req: Request<{ userId: string }, {}, UpdateUserPayload>,
    res: Response
  ) => {
    const { userId } = req.params;
    const updatedUser = await editUser(req.body, userId);
    res.status(StatusCodes.OK).json({ updatedUser });
  }
);

export const getUser = expressAsyncHandler(
  async (req: Request<{ userId: string }, {}, {}>, res: Response) => {
    const { userId } = req.params;
    const user = await findUserById(userId);
    res.status(StatusCodes.OK).json({ user });
  }
);
