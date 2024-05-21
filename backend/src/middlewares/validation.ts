import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validateData = (dto: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsedBody = dto.parse(req.body);
    const unknownFields = Object.keys(req.body).filter((key) => {
      return !Object.keys(parsedBody).includes(key);
    });
    if (unknownFields.length > 0) {
      throw new Error(
        `Unknown field passed into the request body : ${unknownFields.join(
          ", "
        )}`
      );
    }
    next();
  };
};
