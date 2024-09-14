"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_cors = __toESM(require("cors"));
var import_dotenv = __toESM(require("dotenv"));
var import_express4 = __toESM(require("express"));

// src/routes/DaySalesRoute.ts
var import_express = require("express");

// src/controllers/DaySalesController.ts
var DaySalesController = class _DaySalesController {
  constructor(daySalesServiceFactory2) {
    this.daySalesServiceFactory = daySalesServiceFactory2;
  }
  static build(daySalesServiceFactory2) {
    return new _DaySalesController(daySalesServiceFactory2);
  }
  async list(request, response) {
    try {
      const { id } = request.params;
      const DaySalesListing = await this.daySalesServiceFactory.DaySalesListingService();
      const DaySales2 = await DaySalesListing.list(id ?? "");
      return response.status(200).json(DaySales2);
    } catch (error) {
      console.error("Error listing DaySales", error);
      return response.status(500).json({ error: "Failed to list daySales" });
    }
  }
  async write(request, response) {
    try {
      const clientIp = request.ip;
      const { day, sales, goalId } = request.body;
      const daySalesCreation = await this.daySalesServiceFactory.DaySalesCreationService();
      const daySales = await daySalesCreation.create(day, sales, goalId ?? "");
      return response.status(201).json(daySales);
    } catch (error) {
      console.error("Error creating daySales", error);
      return response.status(400).json({ error: "Failed to create daySales" });
    }
  }
  async changeDaySales(request, response) {
    try {
      const { id } = request.params;
      const { day, sales, goalId } = request.body;
      const daySalesUpdate = await this.daySalesServiceFactory.DaySalesUpdateService();
      const daySales = await daySalesUpdate.update(id, day, sales, goalId);
      return response.status(200).json(daySales);
    } catch (error) {
      console.error("Error updating daySales", error);
      return response.status(400).json({ error: "Failed to update daySales" });
    }
  }
  async deleteDaySales(request, response) {
    try {
      const { id } = request.params;
      const daySalesDeletion = await this.daySalesServiceFactory.DaySalesDeletionService();
      await daySalesDeletion.delete(id);
      return response.status(204).json(`$${id} - DaySales deleted`);
    } catch (error) {
      console.error("Error deleting daySales", error);
      return response.status(404).json({ error: "DaySales not found" });
    }
  }
};

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/repositories/DaySalesRepository.ts
var DaySalesRepository = class _DaySalesRepository {
  constructor(prisma2) {
    this.prisma = prisma2;
  }
  static build(prisma2) {
    return new _DaySalesRepository(prisma2);
  }
  async findDaySales(id) {
    return await this.prisma.daySale.findFirst({ where: { id } });
  }
  async save(daySales) {
    const data = {
      id: daySales.id,
      day: daySales.day,
      sales: daySales.sales,
      goalId: daySales.goalId
    };
    await this.prisma.daySale.create({ data });
  }
  async getList(ip) {
    return await this.prisma.daySale.findMany({
      where: { goalId: ip }
    });
  }
  async changeDaySales(id, day, sales, goalId) {
    const changeDaySales = this.prisma.daySale.update({
      where: { id },
      data: { day, sales, goalId }
    });
    return changeDaySales;
  }
  async delete(id) {
    const deletedDaySales = this.prisma.daySale.delete({
      where: { id }
    });
    return deletedDaySales;
  }
};

// src/entities/daySales/DaySales.ts
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

// src/services/daySales/DaySalesCreationService.ts
var DaySalesCreationService = class {
  constructor(daySalesRepository2) {
    this.daySalesRepository = daySalesRepository2;
  }
  async create(day, sales, goalId) {
    if (sales <= 0) {
      throw new Error("Sales amount must be greater than zero");
    }
    if (!day) {
      throw new Error("Day must be a valid date");
    }
    const daySales = DaySales.build(day, sales, goalId);
    await this.daySalesRepository.save(daySales);
    return daySales;
  }
};

// src/services/daySales/DaySalesDeletionService.ts
var DaySalesDeletionService = class {
  constructor(daySalesRepository2) {
    this.daySalesRepository = daySalesRepository2;
  }
  async delete(id) {
    const existDaySales = await this.daySalesRepository.findDaySales(id);
    if (!existDaySales) {
      throw new Error("DaySales not found");
    }
    return await this.daySalesRepository.delete(existDaySales.id);
  }
};

// src/services/daySales/DaySalesListingService.ts
var DaySalesListingService = class {
  constructor(daySalesRepository2) {
    this.daySalesRepository = daySalesRepository2;
  }
  async list(ip) {
    const allDaySales = await this.daySalesRepository.getList(ip);
    return allDaySales;
  }
};

// src/services/daySales/DaySalesUpdateService.ts
var DaySalesUpdateService = class {
  constructor(daySalesRepository2) {
    this.daySalesRepository = daySalesRepository2;
  }
  async update(id, day, sales, goalId) {
    if (sales <= 0) {
      throw new Error("Sales amount must be greater than zero");
    }
    const existDaySales = await this.daySalesRepository.findDaySales(id);
    if (!existDaySales) {
      throw new Error("DaySales not found");
    }
    const updatedDaySales = await this.daySalesRepository.changeDaySales(
      existDaySales.id,
      day,
      sales,
      goalId
    );
    return updatedDaySales;
  }
};

// src/services/daySales/DaySalesServiceFactory.ts
var DaySalesServiceFactory = class _DaySalesServiceFactory {
  constructor(daySalesRepository2) {
    this.daySalesRepository = daySalesRepository2;
  }
  static build(daySalesRepository2) {
    return new _DaySalesServiceFactory(daySalesRepository2);
  }
  DaySalesListingService() {
    return new DaySalesListingService(this.daySalesRepository);
  }
  DaySalesCreationService() {
    return new DaySalesCreationService(this.daySalesRepository);
  }
  DaySalesUpdateService() {
    return new DaySalesUpdateService(this.daySalesRepository);
  }
  DaySalesDeletionService() {
    return new DaySalesDeletionService(this.daySalesRepository);
  }
};

// src/routes/DaySalesRoute.ts
var daySalesRoute = (0, import_express.Router)();
var daySalesRepository = DaySalesRepository.build(prisma);
var daySalesServiceFactory = DaySalesServiceFactory.build(daySalesRepository);
var daySalesRouteController = DaySalesController.build(
  daySalesServiceFactory
);
daySalesRoute.get(
  "/daySales/:id",
  (request, response) => daySalesRouteController.list(request, response)
);
daySalesRoute.post(
  "/daySales/write",
  (request, response) => daySalesRouteController.write(request, response)
);
daySalesRoute.put(
  "/daySales/:id/change",
  (request, response) => daySalesRouteController.changeDaySales(request, response)
);
daySalesRoute.delete(
  "/daySales/:id/delete",
  (request, response) => daySalesRouteController.deleteDaySales(request, response)
);

// src/routes/GoalRoute.ts
var import_express2 = require("express");

// src/entities/goals/Goal.ts
var import_ulid2 = require("ulid");
var Goal = class _Goal {
  constructor(props) {
    this.props = props;
  }
  static build(name, monthlyGoal, workingDays, userIp) {
    return new _Goal({
      id: (0, import_ulid2.ulid)(),
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

// src/services/goal/GoalCreationService.ts
var GoalCreationService = class {
  constructor(goalRepository2) {
    this.goalRepository = goalRepository2;
  }
  async create(name, monthlyGoal, workingDays, userIp) {
    if (name.length < 3) {
      throw new Error("Name must be at least 3 characters long");
    }
    const task = Goal.build(name, monthlyGoal, workingDays, userIp);
    await this.goalRepository.save(task);
    return task;
  }
};

// src/services/goal/GoalDeletionService.ts
var GoalDeletionService = class {
  constructor(goalRepository2) {
    this.goalRepository = goalRepository2;
  }
  async delete(id) {
    const existTask = await this.goalRepository.findGoal(id);
    if (!existTask) {
      throw new Error("Goal not found");
    }
    return await this.goalRepository.delete(existTask.id);
  }
};

// src/services/goal/GoalListingService.ts
var GoalListingService = class {
  constructor(goalRepository2) {
    this.goalRepository = goalRepository2;
  }
  async list(ip) {
    const goals = await this.goalRepository.getList(ip);
    return goals;
  }
};

// src/services/goal/GoalUpdateService.ts
var GoalUpdateService = class {
  constructor(goalRepository2) {
    this.goalRepository = goalRepository2;
  }
  async updateGoal(id, name, monthlyGoal, workingDays) {
    if (name.length < 3) {
      throw new Error("Name must be at least 3 characters long");
    }
    const existGoal = await this.goalRepository.findGoal(id);
    if (!existGoal) {
      throw new Error("Goal not found");
    }
    const updatedGoal = await this.goalRepository.changeGoal(
      existGoal.id,
      name,
      monthlyGoal,
      workingDays
    );
    return updatedGoal;
  }
};

// src/services/goal/GoalServiceFactory.ts
var GoalServiceFactory = class _GoalServiceFactory {
  constructor(goalRepository2) {
    this.goalRepository = goalRepository2;
  }
  static build(goalRepository2) {
    return new _GoalServiceFactory(goalRepository2);
  }
  GoalListingService() {
    return new GoalListingService(this.goalRepository);
  }
  GoalCreationService() {
    return new GoalCreationService(this.goalRepository);
  }
  GoalUpdateService() {
    return new GoalUpdateService(this.goalRepository);
  }
  GoalDeleteService() {
    return new GoalDeletionService(this.goalRepository);
  }
};

// src/controllers/GoalController.ts
var GoalController = class _GoalController {
  constructor(goalServiceFactory2) {
    this.goalServiceFactory = goalServiceFactory2;
  }
  static build(goalServiceFactory2) {
    return new _GoalController(goalServiceFactory2);
  }
  async list(request, response) {
    try {
      const ip = request.headers.authorization;
      const taskListing = await this.goalServiceFactory.GoalListingService();
      const tasks = await taskListing.list(ip ?? "");
      return response.status(200).json(tasks);
    } catch (error) {
      console.error("Error listing goals", error);
      return response.status(500).json({ error: "Failed to list goals" });
    }
  }
  async write(request, response) {
    console.log("RESPOSTA", request.headers.authorization);
    try {
      const ip = request.headers.authorization;
      const { name, monthlyGoal, workingDays } = request.body;
      const taskCreation = await this.goalServiceFactory.GoalCreationService();
      const task = await taskCreation.create(
        name,
        monthlyGoal,
        workingDays,
        ip ?? ""
      );
      return response.status(201).json(task);
    } catch (error) {
      console.error("Error creating goal", error);
      return response.status(400).json({ error: "Failed to create goal" });
    }
  }
  async changeGoal(request, response) {
    try {
      const { id } = request.params;
      const { name, monthlyGoal, workingDays, totalSales } = request.body;
      const goalUpdate = await this.goalServiceFactory.GoalUpdateService();
      const goal = await goalUpdate.updateGoal(
        id,
        name,
        monthlyGoal,
        workingDays
      );
      return response.status(200).json(goal);
    } catch (error) {
      console.error("Error updating goal", error);
      return response.status(400).json({ error: "Failed to update goal" });
    }
  }
  async deleteGoal(request, response) {
    try {
      const { id } = request.params;
      const goalDeletion = await this.goalServiceFactory.GoalDeleteService();
      await goalDeletion.delete(id);
      return response.status(204).json(`$${id} - Goal deleted`);
    } catch (error) {
      console.error("Error deleting goal", error);
      return response.status(404).json({ error: "Goal not found" });
    }
  }
};

// src/repositories/GoalRepository.ts
var GoalRepository = class _GoalRepository {
  constructor(prisma2) {
    this.prisma = prisma2;
  }
  static build(prisma2) {
    return new _GoalRepository(prisma2);
  }
  async findGoal(id) {
    return await this.prisma.goal.findFirst({ where: { id } });
  }
  async save(goal) {
    const data = {
      id: goal.id,
      name: goal.name,
      monthlyGoal: goal.monthlyGoal,
      workingDays: goal.workingDays,
      userIp: goal.userIp
    };
    await this.prisma.goal.create({ data });
  }
  async getList(ip) {
    return await this.prisma.goal.findMany({
      where: { userIp: ip }
    });
  }
  async changeGoal(id, name, monthlyGoal, workingDays) {
    const changeGoal = this.prisma.goal.update({
      where: { id },
      data: { name, monthlyGoal, workingDays }
    });
    return changeGoal;
  }
  async delete(id) {
    const deletedGoal = this.prisma.goal.delete({
      where: { id }
    });
    return deletedGoal;
  }
};

// src/routes/GoalRoute.ts
var goalRouter = (0, import_express2.Router)();
var goalRepository = GoalRepository.build(prisma);
var goalServiceFactory = GoalServiceFactory.build(goalRepository);
var goalController = GoalController.build(goalServiceFactory);
goalRouter.get(
  "/goal/",
  (request, response) => goalController.list(request, response)
);
goalRouter.post(
  "/goal/write",
  (request, response) => goalController.write(request, response)
);
goalRouter.put(
  "/goal/:id/change",
  (request, response) => goalController.changeGoal(request, response)
);
goalRouter.delete(
  "/goal/:id/delete",
  (request, response) => goalController.deleteGoal(request, response)
);

// src/routes/UserRoute.ts
var import_express3 = require("express");

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
var userRouter = (0, import_express3.Router)();
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

// src/server.ts
import_dotenv.default.config();
var server = (0, import_express4.default)();
server.use(import_express4.default.json());
server.use((0, import_cors.default)({ origin: "*" }));
server.use(userRouter);
server.use(goalRouter);
server.use(daySalesRoute);
server.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.ip;
  res.send(ip);
});
var PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
