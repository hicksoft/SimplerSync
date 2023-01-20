import fs from "fs";

import "./setup";

import { defaultDailyPattern } from "../src/engine/patterns";
import Sync from "../src/engine/Sync";
import { cronDirectory, configDirectory } from "../src/engine/di";

beforeEach(() => {
  if (fs.existsSync(cronDirectory))
    fs.rmSync(cronDirectory, { recursive: true });

  if (fs.existsSync(configDirectory))
    fs.rmSync(configDirectory, { recursive: true });

  fs.mkdirSync(cronDirectory, { recursive: true });
  fs.mkdirSync(configDirectory, { recursive: true });
});

afterEach(() => {
  if (fs.existsSync("test/mock")) fs.rmSync("test/mock", { recursive: true });
});

describe("Create new Sync", () => {
  test("toJson", () => {
    const name = "test";
    const description = "description";
    const pattern = defaultDailyPattern;
    const sync = new Sync({ name, description, pattern });

    const json = sync.toJson();
    expect(json.id.length).toBe(36);
    expect(json.name).toBe(name);
    expect(json.description).toBe(description);
    expect(json.pattern).toEqual(pattern);
  });

  describe("save", () => {
    test("Defined cron", () => {
      const name = "test";
      const description = "description";
      const pattern = defaultDailyPattern;
      const sync = new Sync({ name, description, pattern });

      expect(fs.existsSync(sync._getCronFilePath())).toBe(false);

      sync.save();

      expect(fs.existsSync(sync._getCronFilePath())).toBe(true);
      const contents = fs.readFileSync(sync._getCronFilePath(), "utf-8");
      expect(contents.length > 0);
    });
  });
});

describe("Load existing Sync", () => {
  let id: string;
  const props = {
    name: "test",
    description: "description",
    pattern: defaultDailyPattern
  };
  beforeEach(() => {
    const sync = new Sync(props);
    id = sync.id;
    sync.save();
  });

  test("toJson", () => {
    const sync = new Sync({ id });

    const json = sync.toJson();
    expect(json.id.length).toBe(36);
    expect(json.id).toBe(id);
    expect(json.name).toBe(props.name);
    expect(json.description).toBe(props.description);
    expect(json.pattern).toEqual(props.pattern);
  });

  test("Delete", () => {
    const sync = new Sync({ id });

    expect(fs.existsSync(sync._getCronFilePath())).toBe(true);
    sync.delete();
    expect(fs.existsSync(sync._getCronFilePath())).toBe(false);
    expect(() => new Sync({ id })).toThrow();
  });
});
