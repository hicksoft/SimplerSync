import "./setup";
import Job from "../src/engine/Job";
import { exec } from "child_process";

jest.mock("child_process");

beforeEach(jest.clearAllMocks);

describe("Mimimum info to run", () => {
  test("No source", () => {
    const job = new Job({
      mode: Job.Mode.Local,
      options: {},
      user: "",
      host: "",
      port: "",
      src: [],
      dest: "dest/dest"
    });

    job.run();
    expect(exec).not.toBeCalled();
  });

  test("No destination", () => {
    const job = new Job({
      mode: Job.Mode.Local,
      options: {},
      user: "",
      host: "",
      port: "",
      src: ["src/src"],
      dest: ""
    });

    job.run();
    expect(exec).not.toBeCalled();
  });

  test("Has minimum configuration", () => {
    const job = new Job({
      mode: Job.Mode.Local,
      options: {},
      user: "",
      host: "",
      port: "",
      src: ["src/src"],
      dest: "dest/dest"
    });

    job.run();
    expect(exec).toBeCalled();
  });
});

test("Serialize", () => {
  const job = new Job({
    mode: Job.Mode.Local,
    options: { a: true, b: "something" },
    user: "foo",
    host: "bar",
    port: "123",
    src: ["src/src1", "src/src2"],
    dest: "dest/dest"
  });

  expect(job.toSerializable()).toEqual({
    mode: Job.Mode.Local,
    options: { a: true, b: "something" },
    user: "foo",
    host: "bar",
    port: "123",
    src: ["src/src1", "src/src2"],
    dest: "dest/dest"
  });
});

describe("local", () => {
  test("no options, one source", () => {
    const job = new Job({
      mode: Job.Mode.Local,
      options: {},
      user: "",
      host: "",
      port: "",
      src: ["src/src"],
      dest: "dest/dest"
    });

    job.run();
    expect(exec).toBeCalledWith("rsync src/src dest/dest");
  });

  test("no options, multiple sources", () => {
    const job = new Job({
      mode: Job.Mode.Local,
      options: {},
      user: "a",
      host: "a",
      port: "a",
      src: ["src/src1", "src/src2"],
      dest: "dest/dest"
    });

    job.run();
    expect(exec).toBeCalledWith("rsync src/src1 src/src2 dest/dest");
  });
});

describe("Shell pull", () => {
  test("no options, one source, no user", () => {
    const job = new Job({
      mode: Job.Mode.ShellPull,
      options: {},
      user: "",
      host: "some",
      port: "a",
      src: ["src/src"],
      dest: "dest/dest"
    });

    job.run();
    expect(exec).toBeCalledWith("rsync some:src/src dest/dest");
  });

  test("no options, one source, with user", () => {
    const job = new Job({
      mode: Job.Mode.ShellPull,
      options: {},
      user: "some",
      host: "thing",
      port: "a",
      src: ["src/src"],
      dest: "dest/dest"
    });

    job.run();
    expect(exec).toBeCalledWith("rsync some@thing:src/src dest/dest");
  });

  test("no options, multiple source, with user", () => {
    const job = new Job({
      mode: Job.Mode.ShellPull,
      options: {},
      user: "some",
      host: "thing",
      port: "a",
      src: ["src/src1", "src/src2"],
      dest: "dest/dest"
    });

    job.run();
    expect(exec).toBeCalledWith(
      "rsync some@thing:src/src1 some@thing:src/src2 dest/dest"
    );
  });
});

describe("Shell push", () => {
  test("no options, one source, no user", () => {
    const job = new Job({
      mode: Job.Mode.ShellPush,
      options: {},
      user: "",
      host: "some",
      port: "a",
      src: ["src/src"],
      dest: "dest/dest"
    });

    job.run();
    expect(exec).toBeCalledWith("rsync src/src some:dest/dest");
  });

  test("no options, one source, with user", () => {
    const job = new Job({
      mode: Job.Mode.ShellPush,
      options: {},
      user: "some",
      host: "thing",
      port: "a",
      src: ["src/src"],
      dest: "dest/dest"
    });

    job.run();
    expect(exec).toBeCalledWith("rsync src/src some@thing:dest/dest");
  });

  test("no options, multiple source, with user", () => {
    const job = new Job({
      mode: Job.Mode.ShellPush,
      options: {},
      user: "some",
      host: "thing",
      port: "a",
      src: ["src/src1", "src/src2"],
      dest: "dest/dest"
    });

    job.run();
    expect(exec).toBeCalledWith("rsync src/src1 src/src2 some@thing:dest/dest");
  });
});

describe("daemon pull", () => {
  test("no options, one source, no user, no port", () => {
    const job = new Job({
      mode: Job.Mode.DaemonPull,
      options: {},
      user: "",
      host: "thing",
      port: "",
      src: ["src/src"],
      dest: "dest/dest"
    });

    job.run();
    expect(exec).toBeCalledWith("rsync rsync://thing/src/src dest/dest");
  });

  test("no options, one source, with user, no port", () => {
    const job = new Job({
      mode: Job.Mode.DaemonPull,
      options: {},
      user: "some",
      host: "thing",
      port: "",
      src: ["src/src"],
      dest: "dest/dest"
    });

    job.run();
    expect(exec).toBeCalledWith("rsync rsync://some@thing/src/src dest/dest");
  });

  test("no options, one source, with user, with port", () => {
    const job = new Job({
      mode: Job.Mode.DaemonPull,
      options: {},
      user: "some",
      host: "thing",
      port: "123",
      src: ["src/src"],
      dest: "dest/dest"
    });

    job.run();
    expect(exec).toBeCalledWith(
      "rsync rsync://some@thing:123/src/src dest/dest"
    );
  });

  test("no options, multiple sources, with user, with port", () => {
    const job = new Job({
      mode: Job.Mode.DaemonPull,
      options: {},
      user: "some",
      host: "thing",
      port: "123",
      src: ["src/src1", "src/src2"],
      dest: "dest/dest"
    });

    job.run();
    expect(exec).toBeCalledWith(
      "rsync rsync://some@thing:123/src/src1 rsync://some@thing:123/src/src2 dest/dest"
    );
  });
});

describe("daemon push", () => {
  test("no options, one source, no user, no port", () => {
    const job = new Job({
      mode: Job.Mode.DaemonPush,
      options: {},
      user: "",
      host: "thing",
      port: "",
      src: ["src/src"],
      dest: "dest/dest"
    });

    job.run();
    expect(exec).toBeCalledWith("rsync src/src rsync://thing/dest/dest");
  });

  test("no options, one source, with user, no port", () => {
    const job = new Job({
      mode: Job.Mode.DaemonPush,
      options: {},
      user: "some",
      host: "thing",
      port: "",
      src: ["src/src"],
      dest: "dest/dest"
    });

    job.run();
    expect(exec).toBeCalledWith("rsync src/src rsync://some@thing/dest/dest");
  });

  test("no options, one source, with user, with port", () => {
    const job = new Job({
      mode: Job.Mode.DaemonPush,
      options: {},
      user: "some",
      host: "thing",
      port: "123",
      src: ["src/src"],
      dest: "dest/dest"
    });

    job.run();
    expect(exec).toBeCalledWith(
      "rsync src/src rsync://some@thing:123/dest/dest"
    );
  });

  test("no options, multiple sources, with user, with port", () => {
    const job = new Job({
      mode: Job.Mode.DaemonPush,
      options: {},
      user: "some",
      host: "thing",
      port: "123",
      src: ["src/src1", "src/src2"],
      dest: "dest/dest"
    });

    job.run();
    expect(exec).toBeCalledWith(
      "rsync src/src1 src/src2 rsync://some@thing:123/dest/dest"
    );
  });
});

describe("Options", () => {
  const details = {
    mode: Job.Mode.Local,
    user: "",
    host: "",
    port: "",
    src: ["src"],
    dest: "dest"
  };

  test("No options", () => {
    const job = new Job({ ...details, options: {} });
    job.run();
    expect(exec).toBeCalledWith("rsync src dest");
  });

  test("1 arg - string", () => {
    const job = new Job({ ...details, options: { a: "something" } });
    job.run();
    expect(exec).toBeCalledWith("rsync --a=something src dest");
  });

  test("1 arg - boolean true", () => {
    const job = new Job({ ...details, options: { a: true } });
    job.run();
    expect(exec).toBeCalledWith("rsync --a src dest");
  });

  test("1 arg - string empty", () => {
    const job = new Job({ ...details, options: { a: "" } });
    job.run();
    expect(exec).toBeCalledWith("rsync src dest");
  });

  test("1 arg - boolean false", () => {
    const job = new Job({ ...details, options: { a: false } });
    job.run();
    expect(exec).toBeCalledWith("rsync src dest");
  });

  test("1 arg - multiple args - boolean, string", () => {
    const job = new Job({ ...details, options: { a: true, b: "something" } });
    job.run();
    expect(exec).toBeCalledWith("rsync --a --b=something src dest");
  });

  test("1 arg - multiple args - boolean false, string", () => {
    const job = new Job({ ...details, options: { a: false, b: "something" } });
    job.run();
    expect(exec).toBeCalledWith("rsync --b=something src dest");
  });

  test("1 arg - multiple args - boolean, string empty", () => {
    const job = new Job({ ...details, options: { a: true, b: "" } });
    job.run();
    expect(exec).toBeCalledWith("rsync --a src dest");
  });

  test("1 arg - multiple args - boolean false, string empty", () => {
    const job = new Job({ ...details, options: { a: false, b: "" } });
    job.run();
    expect(exec).toBeCalledWith("rsync src dest");
  });
});
