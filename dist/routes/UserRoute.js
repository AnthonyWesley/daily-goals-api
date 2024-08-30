"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/UserRoute.ts
var UserRoute_exports = {};
__export(UserRoute_exports, {
  userRouter: () => userRouter
});
module.exports = __toCommonJS(UserRoute_exports);
var import_express = require("express");

// src/controllers/UserController.ts
var UserController = class _UserController {
  constructor(userServiceFactory2) {
    this.userServiceFactory = userServiceFactory2;
  }
  static build(userServiceFactory2) {
    return new _UserController(userServiceFactory2);
  }
  async write(request, response) {
    try {
      const ip = request.headers["x-forwarded-for"] || request.ip;
      console.log(ip);
      const userCreation = await this.userServiceFactory.UserCreationService();
      const user = await userCreation.create(ip ?? "");
      return response.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      return response.status(500).json({ error: "Failed to create user" });
    }
  }
  async list(request, response) {
    try {
      const ip = request.headers["x-forwarded-for"] || request.ip;
      console.log(ip);
      const userListing = await this.userServiceFactory.UserListingService();
      const users = await userListing.list(ip ?? "");
      return response.status(200).json(users);
    } catch (error) {
      console.error("Error listing users:", error);
      return response.status(500).json({ error: "Failed to list users" });
    }
  }
};

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/repositories/UserRepository.ts
var UserRepository = class _UserRepository {
  constructor(prisma2) {
    this.prisma = prisma2;
  }
  static build(prisma2) {
    return new _UserRepository(prisma2);
  }
  async findIp(ip) {
    return await this.prisma.user.findFirst({ where: { ip } });
  }
  async save(user) {
    const data = {
      ip: user.ip
    };
    await this.prisma.user.create({ data });
  }
  async getList(ip) {
    return await this.prisma.user.findMany();
  }
};

// src/entities/user/User.ts
var User = class _User {
  constructor(props) {
    this.props = props;
  }
  static build(ip) {
    return new _User({ ip });
  }
  get ip() {
    return this.props.ip;
  }
};

// src/services/user/UserCreationService.ts
var UserCreationService = class {
  constructor(userRepository2) {
    this.userRepository = userRepository2;
  }
  async create(ip) {
    const findUser = await this.userRepository.findIp(ip);
    if (!findUser || findUser.ip !== ip) {
      const newUser = await User.build(ip);
      await this.userRepository.save(newUser);
    }
    const user = await this.userRepository.findIp(ip);
    return user;
  }
};

// src/services/user/UserListingService.ts
var UserListingService = class {
  constructor(userRepository2) {
    this.userRepository = userRepository2;
  }
  async list(ip) {
    const findUser = await this.userRepository.findIp(ip);
    if (!findUser || findUser.ip !== ip) {
      const newUser = await User.build(ip);
      await this.userRepository.save(newUser);
    }
    const users = await this.userRepository.getList(ip);
    return users;
  }
};

// src/services/user/UserServiceFactory.ts
var UserServiceFactory = class _UserServiceFactory {
  constructor(userRepository2) {
    this.userRepository = userRepository2;
  }
  static build(userRepository2) {
    return new _UserServiceFactory(userRepository2);
  }
  UserListingService() {
    return new UserListingService(this.userRepository);
  }
  UserCreationService() {
    return new UserCreationService(this.userRepository);
  }
};

// src/routes/UserRoute.ts
var userRouter = (0, import_express.Router)();
var userRepository = UserRepository.build(prisma);
var userServiceFactory = UserServiceFactory.build(userRepository);
var userController = UserController.build(userServiceFactory);
userRouter.get(
  "/user/",
  (request, response) => userController.list(request, response)
);
userRouter.post(
  "/user/write",
  (request, response) => userController.write(request, response)
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userRouter
});
