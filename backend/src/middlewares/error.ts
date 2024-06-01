import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { StatusCodes } from "http-status-codes";
import { JOSEError } from "jose/errors";
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  console.log(error);
  if (error instanceof JOSEError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized Access" });
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "Internal Server Error" });
};
