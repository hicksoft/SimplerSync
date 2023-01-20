import { v4 as uuid } from "uuid";
import fs from "fs";

import Cronjob from "./Cronjob";
import { Pattern } from "./patterns";
import cronjobFactory from "./cronjobFactory";
import { cronDirectory, configSyncs } from "./di";

interface IPropsCreate {
  name: string;
  description: string;
  pattern: Pattern;
}

interface IPropsRead {
  id: string;
}

export default class Sync {
  id: IPropsRead["id"];
  name: IPropsCreate["name"];
  description: IPropsCreate["description"];
  pattern: IPropsCreate["pattern"];
  cron: Cronjob;

  constructor(props: IPropsCreate | IPropsRead) {
    if ("id" in props) {
      const config = this._getConfig()[props.id];

      this.id = props.id;
      this.name = config.name;
      this.description = config.description;
      this.pattern = config.pattern;
    } else {
      this.id = uuid();
      this.name = props.name;
      this.description = props.description;
      this.pattern = props.pattern;
    }

    this.cron = this._initCron();
  }

  save() {
    this._saveConfig();
    this._saveCron();
  }

  delete() {
    this._deleteCron();
    this._deleteCron();
  }

  _initCron() {
    const cron = cronjobFactory(this.pattern);
    cron.user = "root";
    cron.command = `runner ${this.id}`;
    return cron;
  }

  _getCronPath() {
    return `${cronDirectory}/${this.id}`;
  }

  _getConfigPath() {
    return configSyncs as string;
  }

  _saveCron() {
    const path = this._getCronPath();
    const contents = this.cron.toString();
    fs.writeFileSync(path, contents);
  }

  _deleteCron() {
    const path = this._getCronPath();
    if (fs.existsSync(path)) fs.rmSync(path);
  }

  _writeConfig(config: JSON) {
    const path = this._getConfigPath();
    fs.writeFileSync(path, JSON.stringify(config));
  }

  _saveConfig() {
    const config = this._getConfig();
    config[this.id] = {
      name: this.name,
      description: this.description,
      pattern: this.pattern
    };
    this._writeConfig(config);
  }

  _getConfig() {
    const path = this._getConfigPath();
    if (!fs.existsSync(path)) return {};
    else return JSON.parse(fs.readFileSync(path, "utf-8"));
  }

  _deleteConfig() {
    const config = this._getConfig();
    const { [this.id]: _, ...rest } = config;
    this._writeConfig(rest);
  }
}
