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

// src/entities/daySales/DaySales.ts
var DaySales_exports = {};
__export(DaySales_exports, {
  DaySales: () => DaySales
});
module.exports = __toCommonJS(DaySales_exports);
var import_ulid = require("ulid");
var DaySales = class _DaySales {
  constructor(props) {
    this.props = props;
  }
  static build(day, sales, goalId) {
    return new _DaySales({
      id: (0, import_ulid.ulid)(),
      day,
      sales,
      goalId
    });
  }
  get id() {
    return this.props.id;
  }
  get day() {
    return this.props.day;
  }
  get sales() {
    return this.props.sales;
  }
  get goalId() {
    return this.props.goalId;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DaySales
});
