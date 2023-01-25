import fs from "fs";

import { resetMockDirs } from "./setup";

import Cron from "../src/engine/Cron";
import { cronDirectory } from "../src/engine/di";

beforeEach(resetMockDirs);

const get = (id: string) => {
  const file = `${cronDirectory}/${id}`;
  if (fs.existsSync(file)) return fs.readFileSync(file, "utf-8");
  else return undefined;
};

test("Serialize full", () => {
  const cron = new Cron("123", {
    frequency: "daily",
    dayOfMonth: "1",
    dayOfWeek: "2",
    time: {
      hour: "3",
      minute: "4"
    }
  });
  expect(cron.toSerializable()).toEqual({
    frequency: "daily",
    dayOfMonth: "1",
    dayOfWeek: "2",
    time: {
      hour: "3",
      minute: "4"
    }
  });
});

test("Serialize partial", () => {
  const cron = new Cron("123", {
    frequency: "daily"
  });
  expect(cron.toSerializable()).toEqual({
    frequency: "daily"
  });
});

test("Create Cron and expect default file", () => {
  new Cron("123", { frequency: "daily" });
  expect(get("123")).toBe("* * * * * root runner 123");
});

test("Create Cron with time", () => {
  new Cron("123", { frequency: "daily", time: { hour: "2", minute: "0" } });
  expect(get("123")).toBe("0 2 * * * root runner 123");
});

test("Create Cron with day of week", () => {
  new Cron("123", { frequency: "daily", dayOfWeek: "6" });
  expect(get("123")).toBe("* * * * 6 root runner 123");
});

test("Create Cron with day of month", () => {
  new Cron("123", { frequency: "daily", dayOfMonth: "12" });
  expect(get("123")).toBe("* * 12 * * root runner 123");
});

test("Update Cron", () => {
  new Cron("123", { frequency: "daily", dayOfWeek: "1" });
  expect(get("123")).toBe("* * * * 1 root runner 123");

  new Cron("123", { frequency: "daily", dayOfMonth: "6" });
  expect(get("123")).toBe("* * 6 * * root runner 123");
});

test("Delete", () => {
  const cron = new Cron("123", { frequency: "daily" });
  expect(get("123")).toBe("* * * * * root runner 123");
  cron.delete();
  expect(get("123")).toBeUndefined();
});
