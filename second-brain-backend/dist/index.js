"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_Secret = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const generateLink_1 = require("./generateLink");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
exports.JWT_Secret = "shrivarshancsv";
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const hashpassword = yield bcrypt_1.default.hash(password, 5);
    const result = yield db_1.userModel.findOne({
        username: username,
    });
    if (!result) {
        yield db_1.userModel.create({
            username: username,
            password: hashpassword
        });
        res.status(200).json({ "message": "Signup successful" });
    }
    else {
        res.status(409).json({ "message": "user already exist" }).status(409);
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const findUser = yield db_1.userModel.findOne({
            username: username,
        });
        if (!findUser) {
            return res.status(404).json({ "message": "User not found" });
        }
        //@ts-ignore
        const decrypt = yield bcrypt_1.default.compare(password, findUser.password);
        if (decrypt) {
            const token = jsonwebtoken_1.default.sign({
                id: findUser._id
            }, exports.JWT_Secret);
            return res.status(200).json({ token, "message": "SignedIn" });
        }
        else {
            return res.status(409).json({
                "message": "Incorrect authorization"
            });
        }
    }
    catch (e) {
        res.status(404).json({ "message": "servor error" });
    }
}));
app.post("/api/v1/content", middleware_1.useMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.body.type;
    const link = req.body.link;
    const title = req.body.title;
    const description = req.body.description;
    const tags = req.body.tags;
    const createContent = yield db_1.ContentModel.create({
        type: type,
        link: link,
        title: title,
        description: description,
        tags: [],
        //@ts-ignore
        userId: req.userId
    });
    if (createContent) {
        res.status(200).json({ "mesage": "contents added successfully" });
    }
    else {
        res.status(404).json({ "message": "content not added" });
    }
}));
app.get("/api/v1/content", middleware_1.useMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    try {
        const content = yield db_1.ContentModel.find({
            userId
        }).populate("userId", "username");
        res.status(200).json({ content });
    }
    catch (e) {
        res.status(404).json({ "message": "user id not found" });
    }
}));
app.delete("/api/v1/delete", (req, res) => {
});
// POST route to create or delete a share link
app.post("/api/v1/brain/share", middleware_1.useMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { share } = req.body;
    try {
        //@ts-ignore
        const existingLink = yield db_1.linkModel.findOne({ userId: req.userId });
        if (share) {
            if (existingLink) {
                return res.json({ message: existingLink.hash });
            }
            const newLink = yield db_1.linkModel.create({
                //@ts-ignore
                userId: req.userId,
                hash: (0, generateLink_1.generate)(15),
            });
            return res.json({ message: newLink.hash });
        }
        else {
            // If `share` is false, delete existing share link
            if (existingLink) {
                //@ts-ignore
                yield db_1.linkModel.deleteOne({ userId: req.userId });
                return res.json({ message: "Link deleted" });
            }
            else {
                return res.json({ message: "No link found to delete" });
            }
        }
    }
    catch (error) {
        console.error("Error in POST /brain/share:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const header = req.params.shareLink;
        const findLink = yield db_1.linkModel.findOne({ hash: header });
        if (!findLink) {
            return res.status(404).json({ message: "Share link may be wrong" });
        }
        const findContent = yield db_1.ContentModel.find({ userId: findLink.userId });
        if (!findContent || findContent.length === 0) {
            return res.status(404).json({ message: "Content not found" });
        }
        const findUser = yield db_1.userModel.findOne({ _id: findLink.userId });
        if (!findUser) {
            return res.status(404).json({ message: "User details not found" });
        }
        return res.status(200).json({
            findUser,
            findContent,
        });
    }
    catch (error) {
        console.error("Error in GET /api/v1/brain/:shareLink:", error);
        return res.status(500).json({ message: "Server error" });
    }
}));
app.listen(3000, () => {
    console.log(`app running on port ${3000}`);
});
