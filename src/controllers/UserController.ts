import { UserServiceFactory } from "../services/user/UserServiceFactory";
import { Request, Response } from "express";

export class UserController {
  constructor(readonly userServiceFactory: UserServiceFactory) {}

  public static build(userServiceFactory: UserServiceFactory) {
    return new UserController(userServiceFactory);
  }

  async write(request: Request, response: Response) {
    try {
      const { deviceId } = request.body;

      const userCreation = await this.userServiceFactory.UserCreationService();
      const user = await userCreation.create(deviceId ?? "");

      return response.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      return response.status(500).json({ error: "Failed to create user" });
    }
  }

  async list(request: Request, response: Response) {
    try {
      const { deviceId } = request.body;

      const userListing = await this.userServiceFactory.UserListingService();
      const users = await userListing.list(deviceId ?? "");

      return response.status(200).json(users);
    } catch (error) {
      console.error("Error listing users:", error);
      return response.status(500).json({ error: "Failed to list users" });
    }
  }
}
