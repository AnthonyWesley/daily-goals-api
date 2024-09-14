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

// src/controllers/UserController.ts
var UserController_exports = {};
__export(UserController_exports, {
  UserController: () => UserController
});
module.exports = __toCommonJS(UserController_exports);
var UserController = class _UserController {
  constructor(userServiceFactory) {
    this.userServiceFactory = userServiceFactory;
  }
  static build(userServiceFactory) {
    return new _UserController(userServiceFactory);
  }
  async write(request, response) {
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
  async list(request, response) {
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
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserController
});
