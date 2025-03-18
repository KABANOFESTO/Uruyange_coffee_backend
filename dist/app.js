"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const database_1 = require("./v1/config/database");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.get('/', (req, res, next) => {
    res.send('Hello World');
});
app.use(express_1.default.json());
const PORT = process.env.PORT || 7000;
const startServer = async () => {
    try {
        await (0, database_1.connectToDB)();
        app.listen(PORT, () => {
            console.log("server started");
        });
    }
    catch (error) {
        console.log("failed to start server", error);
        process.exit(1);
    }
};
startServer().catch(console.error);
process.on('SIGINT', async () => {
    try {
        await (0, database_1.disconnectFromDB)();
        process.exit(0);
    }
    catch (error) {
        console.log("failed to disconnect from db", error);
        process.exit(1);
    }
});
exports.default = app;
//# sourceMappingURL=app.js.map