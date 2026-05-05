"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _1 = require(".");
const useMiddleware = (req, res, next) => {
    const header = req.headers.authorization;
    try {
        const decodedata = jsonwebtoken_1.default.verify(header, _1.JWT_Secret);
        if (decodedata) {
            //@ts-ignore
            req.userId = decodedata.id;
            next();
        }
        else {
            res.status(403).json("you are not logged in ");
        }
    }
    catch (e) {
        res.status(403).json({ "message": "Invalid token" });
    }
};
exports.useMiddleware = useMiddleware;
