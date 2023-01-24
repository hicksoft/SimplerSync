import { resetDirectories } from "./setup";

import config from "../src/engine/config";

beforeEach(resetDirectories);

test("Retrieve from nothing", () => {
  expect(config.get("key")).toBeUndefined();
});

test("Save and retrieve a number", () => {
  config.save("key", 1);
  expect(config.get("key")).toBe(1);
});

test("Save and retrieve a string", () => {
  config.save("key", "abc");
  expect(config.get("key")).toBe("abc");
});

test("Save and retrieve an object", () => {
  const obj = { a: 1, b: 2, c: { x: "a" } };
  config.save("key", obj);
  expect(config.get("key")).toEqual(obj);
});

test("Delete only key", () => {
  config.save("key", 1);
  expect(config.get("key")).toBe(1);
  config.remove("key");
  expect(config.get("key")).toBeUndefined();
});

test("Delete one key", () => {
  config.save("key1", 1);
  config.save("key2", 2);
  expect(config.get("key1")).toBe(1);
  expect(config.get("key2")).toBe(2);
  config.remove("key2");
  expect(config.get("key1")).toBe(1);
  expect(config.get("key2")).toBeUndefined();
});
