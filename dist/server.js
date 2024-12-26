"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
const mongoose_1 = __importDefault(require("mongoose"));
let server;
async function main() {
    try {
        await mongoose_1.default.connect(config_1.default.database_url);
        server = app_1.default.listen(config_1.default.port, () => {
            console.log(`App is listening on port ${config_1.default.port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
}
main();
process.on('unhandledRejection', () => {
    console.log('unhandledRejection is detected');
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on('uncaughtException', () => {
    console.log('uncaughtException is detected');
    process.exit(1);
});
