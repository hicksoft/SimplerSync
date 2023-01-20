import fs from "fs";

import "./setup";

import { defaultDailyPattern } from "../src/engine/patterns";
import Sync from "../src/engine/Sync";

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
      sync.save();

      expect(fs.existsSync(sync._getCronPath())).toBe(true);
      const contents = fs.readFileSync(sync._getCronPath(), "utf-8");
      expect(contents.length > 0);
    });
  });
});
