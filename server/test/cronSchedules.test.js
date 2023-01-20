"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cronjobFactory_1 = __importDefault(require("../src/engine/cronjobFactory"));
var testDaily = function (time) {
    var pattern = {
        frequency: "daily",
        time: time
    };
    var cron = (0, cronjobFactory_1.default)(pattern);
    cron.user = "test";
    var result = cron.toString();
    return result.substring(0, result.indexOf(" test"));
};
var testWeekly = function (dayOfWeek, time) {
    var pattern = {
        frequency: "weekly",
        dayOfWeek: dayOfWeek,
        time: time
    };
    var cron = (0, cronjobFactory_1.default)(pattern);
    cron.user = "test";
    var result = cron.toString();
    return result.substring(0, result.indexOf(" test"));
};
var testMonthly = function (dayOfMonth, time) {
    var pattern = {
        frequency: "monthly",
        dayOfMonth: dayOfMonth,
        time: time
    };
    var cron = (0, cronjobFactory_1.default)(pattern);
    cron.user = "test";
    var result = cron.toString();
    return result.substring(0, result.indexOf(" test"));
};
var dailyTests = [
    { time: { hour: 3, minute: 10 }, str: "3:10am", schedule: "10 3 * * *" },
    { time: { hour: 19, minute: 59 }, str: "7:59pm", schedule: "59 19 * * *" },
    { time: { hour: 0, minute: 0 }, str: "12:00am", schedule: "0 0 * * *" },
    { time: { hour: 12, minute: 0 }, str: "12:00pm", schedule: "0 12 * * *" }
];
var weeklyTests = [
    {
        time: { hour: 3, minute: 10 },
        dayOfWeek: 3,
        str: "Wed 3:10am",
        schedule: "10 3 * * 3"
    },
    {
        time: { hour: 19, minute: 59 },
        dayOfWeek: 6,
        str: "Sat 7:59pm",
        schedule: "59 19 * * 6"
    },
    {
        time: { hour: 0, minute: 0 },
        dayOfWeek: 2,
        str: "Tue 12:00am",
        schedule: "0 0 * * 2"
    },
    {
        time: { hour: 12, minute: 0 },
        dayOfWeek: 5,
        str: "Fri 12:00pm",
        schedule: "0 12 * * 5"
    }
];
var monthlyTests = [
    {
        time: { hour: 3, minute: 10 },
        dayOfMonth: 12,
        str: "12th 3:10am",
        schedule: "10 3 12 * *"
    },
    {
        time: { hour: 19, minute: 59 },
        dayOfMonth: 6,
        str: "6th 7:59pm",
        schedule: "59 19 6 * *"
    },
    {
        time: { hour: 0, minute: 0 },
        dayOfMonth: 17,
        str: "17th 12:00am",
        schedule: "0 0 17 * *"
    },
    {
        time: { hour: 12, minute: 0 },
        dayOfMonth: 5,
        str: "5th 12:00pm",
        schedule: "0 12 5 * *"
    }
];
describe("Daily Patterns", function () {
    dailyTests.forEach(function (_a) {
        var time = _a.time, str = _a.str, schedule = _a.schedule;
        test("Daily ".concat(str, " - ").concat(schedule), function () {
            expect(testDaily(time)).toBe(schedule);
        });
    });
});
describe("Weekly Patterns", function () {
    weeklyTests.forEach(function (_a) {
        var time = _a.time, dayOfWeek = _a.dayOfWeek, str = _a.str, schedule = _a.schedule;
        test("Weekly ".concat(str, " - ").concat(schedule), function () {
            expect(testWeekly(dayOfWeek, time)).toBe(schedule);
        });
    });
});
describe("Monthly Patterns", function () {
    monthlyTests.forEach(function (_a) {
        var time = _a.time, dayOfMonth = _a.dayOfMonth, str = _a.str, schedule = _a.schedule;
        test("Weekly ".concat(str, " - ").concat(schedule), function () {
            expect(testMonthly(dayOfMonth, time)).toBe(schedule);
        });
    });
});
