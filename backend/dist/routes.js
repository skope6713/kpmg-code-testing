"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("./controllers");
const routes = express_1.default.Router();
routes.get("/breads", controllers_1.getAllBreads);
routes.get("/bread/:bread", controllers_1.getBreadImgUrl);
exports.default = routes;
//# sourceMappingURL=routes.js.map