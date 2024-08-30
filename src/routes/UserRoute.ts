import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { prisma } from "../prisma";
import { UserRepository } from "../repositories/UserRepository";
import { UserServiceFactory } from "../services/user/UserServiceFactory";

export const userRouter = Router();

const userRepository = UserRepository.build(prisma);
const userServiceFactory = UserServiceFactory.build(userRepository);
const userController = UserController.build(userServiceFactory);

userRouter.get("/user/", (request, response) =>
  userController.list(request, response)
);

userRouter.post("/user/write", (request, response) =>
  userController.write(request, response)
);
