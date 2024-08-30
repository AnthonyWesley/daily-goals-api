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

// src/repositories/UserRepository.ts
var UserRepository_exports = {};
__export(UserRepository_exports, {
  UserRepository: () => UserRepository
});
module.exports = __toCommonJS(UserRepository_exports);
var UserRepository = class _UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  static build(prisma) {
    return new _UserRepository(prisma);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserRepository
});
