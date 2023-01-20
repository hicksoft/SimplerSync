import initCronjobWithSchedule from "../src/engine/cronjobFactory";
import {
  DailyPattern,
  WeeklyPattern,
  MonthlyPattern,
  Time
} from "../src/engine/patterns";

const testDaily = (time: Time) => {
  const pattern: DailyPattern = {
    frequency: "daily",
    time
  };
  const cron = initCronjobWithSchedule(pattern);
  cron.user = "test";
  const result = cron.toString();
  return result.substring(0, result.indexOf(" test"));
};

const testWeekly = (dayOfWeek: number, time: Time) => {
  const pattern: WeeklyPattern = {
    frequency: "weekly",
    dayOfWeek,
    time
  };
  const cron = initCronjobWithSchedule(pattern);
  cron.user = "test";
  const result = cron.toString();
  return result.substring(0, result.indexOf(" test"));
};

const testMonthly = (dayOfMonth: number, time: Time) => {
  const pattern: MonthlyPattern = {
    frequency: "monthly",
    dayOfMonth,
    time
  };
  const cron = initCronjobWithSchedule(pattern);
  cron.user = "test";
  const result = cron.toString();
  return result.substring(0, result.indexOf(" test"));
};

const dailyTests = [
  { time: { hour: 3, minute: 10 }, str: "3:10am", schedule: "10 3 * * *" },
  { time: { hour: 19, minute: 59 }, str: "7:59pm", schedule: "59 19 * * *" },
  { time: { hour: 0, minute: 0 }, str: "12:00am", schedule: "0 0 * * *" },
  { time: { hour: 12, minute: 0 }, str: "12:00pm", schedule: "0 12 * * *" }
];

const weeklyTests = [
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

const monthlyTests = [
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

describe("Daily Patterns", () => {
  dailyTests.forEach(({ time, str, schedule }) => {
    test(`Daily ${str} - ${schedule}`, () => {
      expect(testDaily(time)).toBe(schedule);
    });
  });
});

describe("Weekly Patterns", () => {
  weeklyTests.forEach(({ time, dayOfWeek, str, schedule }) => {
    test(`Weekly ${str} - ${schedule}`, () => {
      expect(testWeekly(dayOfWeek, time)).toBe(schedule);
    });
  });
});

describe("Monthly Patterns", () => {
  monthlyTests.forEach(({ time, dayOfMonth, str, schedule }) => {
    test(`Weekly ${str} - ${schedule}`, () => {
      expect(testMonthly(dayOfMonth, time)).toBe(schedule);
    });
  });
});
