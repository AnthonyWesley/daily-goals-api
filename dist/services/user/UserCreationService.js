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

// src/services/user/UserCreationService.ts
var UserCreationService_exports = {};
__export(UserCreationService_exports, {
  UserCreationService: () => UserCreationService
});
module.exports = __toCommonJS(UserCreationService_exports);

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
  constructor(userRepository) {
    this.userRepository = userRepository;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserCreationService
});
