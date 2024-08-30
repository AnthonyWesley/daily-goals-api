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

// src/entities/goals/Goal.ts
var Goal_exports = {};
__export(Goal_exports, {
  Goal: () => Goal
});
module.exports = __toCommonJS(Goal_exports);
var import_ulid = require("ulid");
var Goal = class _Goal {
  constructor(props) {
    this.props = props;
  }
  static build(name, monthlyGoal, workingDays, userIp) {
    return new _Goal({
      id: (0, import_ulid.ulid)(),
      name,
      monthlyGoal,
      workingDays,
      userIp
    });
  }
  get id() {
    return this.props.id;
  }
  get name() {
    return this.props.name;
  }
  get monthlyGoal() {
    return this.props.monthlyGoal;
  }
  get workingDays() {
    return this.props.workingDays;
  }
  get userIp() {
    return this.props.userIp;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Goal
});
