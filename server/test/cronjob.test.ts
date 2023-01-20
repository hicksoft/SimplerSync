import Cronjob from "../src/engine/Cronjob";

describe("Cronjob user", () => {
  test("Deafult = Root", () => {
    const cron = new Cronjob();
    const user = cron.toString().split(" ")[5];
    expect(user).toBe("root");
  });

  test("Root", () => {
    const cron = new Cronjob();
    cron.user = "root";
    const user = cron.toString().split(" ")[5];
    expect(user).toBe("root");
  });

  test("Alice", () => {
    const cron = new Cronjob();
    cron.user = "alice";
    const user = cron.toString().split(" ")[5];
    expect(user).toBe("alice");
  });
});

describe("Cronjob command", () => {
  test("runscript", () => {
    const cron = new Cronjob();
    cron.command = "runscript";
    const command = cron.toString().split(" ")[6];
    expect(command).toBe("runscript");
  });
});

test("Cronjob number of parts", () => {
  const cron = new Cronjob();
  const parts = cron.toString().split(" ");
  expect(parts.length).toBe(7);
});
