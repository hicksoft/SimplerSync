import fs from "fs";
import { configDirectory } from "./di";

export function getAll() {
  return _load();
}

export function get(key: string) {
  const config = _load();
  return key in config ? config[key] : null;
}

export function save(key: string, value: any) {
  const config = _load();
  config[key] = value;
  _write(config);
}

export function remove(key: string) {
  const config = _load();
  const { [key]: _, ...rest } = config;
  _write(rest);
}

function _getPath() {
  return `${configDirectory}/SimplerSync.json`;
}

function _load() {
  const path = _getPath();
  if (fs.existsSync(path)) return JSON.parse(fs.readFileSync(path, "utf-8"));
  else return {};
}

function _write(data: object) {
  const path = _getPath();
  fs.writeFileSync(path, JSON.stringify(data));
}

export default {
  getAll,
  get,
  save,
  remove
};
