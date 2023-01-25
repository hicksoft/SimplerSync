import { exec } from "child_process";

import { resetMockDirs } from "./setup";

import Sync from "../src/engine/Sync";
import { DEFAULT_JOB } from "../src/engine/Job";
import { DEFAULT_SCHEDULE } from "../src/engine/Cron";

jest.mock("child_process");

beforeEach(resetMockDirs);
beforeEach(jest.clearAllMocks);

test("Create and reload a Sync", () => {
  const name = "some name";
  const description = "some description";
  const job = DEFAULT_JOB;
  const schedule = DEFAULT_SCHEDULE;

  const createdSync = Sync.create({ name, description, job, schedule });
  const loadedSync = Sync.load(createdSync.id) as Sync;

  expect(createdSync.id.length).toBe(36);
  expect(createdSync.toSerializable()).toEqual({
    id: createdSync.id,
    name,
    description,
    job,
    schedule
  });
  expect(createdSync.toSerializable()).toEqual(loadedSync.toSerializable());
});

test("Delete", () => {
  const name = "some name";
  const description = "some description";
  const job = DEFAULT_JOB;
  const schedule = DEFAULT_SCHEDULE;

  const sync = Sync.create({ name, description, job, schedule });

  expect(Sync.load(sync.id)).toBeTruthy();
  sync.delete();
  expect(Sync.load(sync.id)).toBeNull();
});

test("Run job", () => {
  const name = "some name";
  const description = "some description";
  const job = { ...DEFAULT_JOB, src: ["src/src"], dest: "dest/dest" };
  const schedule = DEFAULT_SCHEDULE;

  const sync = Sync.create({ name, description, job, schedule });
  sync.runJob();

  expect(exec).toBeCalledWith(expect.stringMatching("rsync*."));
});

describe("Update", () => {
  test("Name", () => {
    const name = "some name";
    const description = "some description";
    const job = DEFAULT_JOB;
    const schedule = DEFAULT_SCHEDULE;

    const sync = Sync.create({ name, description, job, schedule });

    expect(sync.name).toBe("some name");
    sync.updateName("new name");
    expect(sync.name).toBe("new name");

    const loadedSync = Sync.load(sync.id) as Sync;
    expect(loadedSync.name).toBe("new name");
  });

  test("Description", () => {
    const name = "some name";
    const description = "some description";
    const job = DEFAULT_JOB;
    const schedule = DEFAULT_SCHEDULE;

    const sync = Sync.create({ name, description, job, schedule });

    expect(sync.description).toBe("some description");
    sync.updateDescription("new description");
    expect(sync.description).toBe("new description");

    const loadedSync = Sync.load(sync.id) as Sync;
    expect(loadedSync.description).toBe("new description");
  });

  test("Schedule", () => {
    const name = "some name";
    const description = "some description";
    const job = DEFAULT_JOB;
    const schedule = DEFAULT_SCHEDULE;

    const sync = Sync.create({ name, description, job, schedule });

    expect(sync.cron.toSerializable()).toEqual(DEFAULT_SCHEDULE);
    sync.updateSchedule({ ...DEFAULT_SCHEDULE, dayOfMonth: "28" });
    expect(sync.cron.toSerializable()).toEqual({
      ...DEFAULT_SCHEDULE,
      dayOfMonth: "28"
    });

    const loadedSync = Sync.load(sync.id) as Sync;
    expect(loadedSync.cron.toSerializable()).toEqual({
      ...DEFAULT_SCHEDULE,
      dayOfMonth: "28"
    });
  });

  test("Job", () => {
    const name = "some name";
    const description = "some description";
    const job = DEFAULT_JOB;
    const schedule = DEFAULT_SCHEDULE;

    const sync = Sync.create({ name, description, job, schedule });

    expect(sync.job.toSerializable()).toEqual(DEFAULT_JOB);
    sync.updateJob({ ...DEFAULT_JOB, port: "28" });
    expect(sync.job.toSerializable()).toEqual({
      ...DEFAULT_JOB,
      port: "28"
    });

    const loadedSync = Sync.load(sync.id) as Sync;
    expect(loadedSync.job.toSerializable()).toEqual({
      ...DEFAULT_JOB,
      port: "28"
    });
  });
});

describe("Load all", () => {
  test("None exist", () => {
    const result = Sync.loadAll();
    expect(result.length).toBe(0);
  });

  test("Exist", () => {
    const job = DEFAULT_JOB;
    const schedule = DEFAULT_SCHEDULE;

    const name1 = "some name";
    const description1 = "some description";
    const sync1 = Sync.create({
      name: name1,
      description: description1,
      job,
      schedule
    });

    const name2 = "some name";
    const description2 = "some description";
    const sync2 = Sync.create({
      name: name2,
      description: description2,
      job,
      schedule
    });

    const result = Sync.loadAll();
    expect(result.length).toBe(2);
    expect([sync1.id, sync2.id].sort()).toEqual(
      [result[0].id, result[1].id].sort()
    );
  });
});
