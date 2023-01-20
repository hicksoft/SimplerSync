"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Cronjob_1 = __importDefault(require("../src/engine/Cronjob"));
describe("Cronjob user", function () {
    test("Deafult = Root", function () {
        var cron = new Cronjob_1.default();
        var user = cron.toString().split(" ")[5];
        expect(user).toBe("root");
    });
    test("Root", function () {
        var cron = new Cronjob_1.default();
        cron.user = "root";
        var user = cron.toString().split(" ")[5];
        expect(user).toBe("root");
    });
    test("Alice", function () {
        var cron = new Cronjob_1.default();
        cron.user = "alice";
        var user = cron.toString().split(" ")[5];
        expect(user).toBe("alice");
    });
});
describe("Cronjob command", function () {
    test("runscript", function () {
        var cron = new Cronjob_1.default();
        cron.command = "runscript";
        var command = cron.toString().split(" ")[6];
        expect(command).toBe("runscript");
    });
});
test("Cronjob number of parts", function () {
    var cron = new Cronjob_1.default();
    var parts = cron.toString().split(" ");
    expect(parts.length).toBe(7);
});
