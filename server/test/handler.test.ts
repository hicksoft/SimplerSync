import { exec } from "child_process";

import { resetMockDirs } from "./setup";

import {
  handleCreate,
  handleUpdate,
  handleDelete,
  handleRunner,
  handleGetAll
} from "../src/engine/handlers";
import Sync from "../src/engine/Sync";
import { DEFAULT_SCHEDULE } from "../src/engine/Cron";
import { DEFAULT_JOB } from "../src/engine/Job";

jest.mock("child_process");

beforeEach(resetMockDirs);
beforeEach(jest.resetAllMocks);

describe("Create", () => {
  test("Return value", () => {
    const name = "test";
    const description = "some description";
    const result = handleCreate({ name, description });

    expect(result.id.length).toBe(36);
    expect(result.name).toBe(name);
    expect(result.description).toBe(description);
    expect(result.schedule).toEqual(DEFAULT_SCHEDULE);
    expect(result.job).toEqual(DEFAULT_JOB);
  });

  test("Is retrievable", () => {
    const name = "test";
    const description = "some description";
    const result = handleCreate({ name, description });

    const sync = Sync.load(result.id);
    expect(sync?.id).toBe(result.id);
    expect(sync?.name).toBe(name);
  });
});

describe("Update", () => {
  test("Name", () => {
    const name = "test";
    const description = "some description";
    const created = handleCreate({ name, description });

    const result = handleUpdate({ id: created.id, name: "new name" });
    expect(result?.id).toBe(created.id);

    const sync = Sync.load(created.id);
    expect(result?.name).toBe("new name");
    expect(sync?.name).toBe(result?.name);
  });

  test("Description", () => {
    const name = "test";
    const description = "some description";
    const created = handleCreate({ name, description });

    const result = handleUpdate({
      id: created.id,
      description: "new description"
    });
    expect(result?.id).toBe(created.id);

    const sync = Sync.load(created.id);
    expect(result?.description).toBe("new description");
    expect(sync?.description).toBe(result?.description);
  });

  test("Schedule", () => {
    const name = "test";
    const description = "some description";
    const created = handleCreate({ name, description });

    const result = handleUpdate({
      id: created.id,
      schedule: { ...DEFAULT_SCHEDULE, dayOfWeek: "18" }
    });
    expect(result?.id).toBe(created.id);

    const sync = Sync.load(created.id);
    expect(result?.schedule).toEqual({ ...DEFAULT_SCHEDULE, dayOfWeek: "18" });
    expect(sync?.cron.toSerializable()).toEqual(result?.schedule);
  });

  test("Job", () => {
    const name = "test";
    const description = "some description";
    const created = handleCreate({ name, description });

    const result = handleUpdate({
      id: created.id,
      job: { ...DEFAULT_JOB, dest: "dest/test" }
    });
    expect(result?.id).toBe(created.id);

    const sync = Sync.load(created.id);
    expect(result?.job).toEqual({ ...DEFAULT_JOB, dest: "dest/test" });
    expect(sync?.job.toSerializable()).toEqual(result?.job);
  });

  test("Does not exist", () => {
    const result = handleUpdate({ id: "000-000", name: "abc" });
    expect(result).toBeUndefined();
  });
});

describe("Delete", () => {
  test("Exists", () => {
    const name = "test";
    const description = "some description";
    const created = handleCreate({ name, description });

    const result = handleDelete({ id: created.id });
    expect(result).toEqual({ id: created.id });

    const sync = Sync.load(created.id);
    expect(sync).toBeNull();
  });

  test("Does not exist", () => {
    const result = handleDelete({ id: "000-000" });
    expect(result).toBeUndefined();
  });
});

describe("Runner", () => {
  test("Exists", () => {
    const name = "test";
    const description = "some description";
    const created = handleCreate({ name, description });

    handleUpdate({
      id: created.id,
      job: { ...DEFAULT_JOB, src: ["src"], dest: "dest" }
    });

    handleRunner({ id: created.id });
    expect(exec).toBeCalled();
  });

  test("Does not exist", () => {
    handleRunner({ id: "000-000" });
    expect(exec).not.toBeCalled();
  });
});

describe("Get all", () => {
  test("None exist", () => {
    const result = handleGetAll();
    expect(result.length).toBe(0);
  });

  test("Exists", () => {
    const created1 = handleCreate({ name: "test1", description: "something1" });
    const created2 = handleCreate({ name: "test2", description: "something2" });

    const result = handleGetAll();
    expect(result.length).toBe(2);
    expect([created1.id, created2.id].sort()).toEqual(
      [result[0].id, result[1].id].sort()
    );
  });
});
