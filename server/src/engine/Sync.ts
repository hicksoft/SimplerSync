import { v4 as uuid } from "uuid";
import fs from "fs";

import Cronjob from "./Cronjob";
import { Pattern } from "./patterns";
import cronjobFactory from "./cronjobFactory";
import { cronDirectory, configDirectory } from "./di";

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
      const config = this._readConfig()[props.id];

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
    this._deleteConfig();
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      pattern: this.pattern
    };
  }

  _initCron() {
    const cron = cronjobFactory(this.pattern);
    cron.user = "root";
    cron.command = `runner ${this.id}`;
    return cron;
  }

  _getCronFilePath() {
    return `${cronDirectory}/${this.id}`;
  }

  _getConfigFilePath() {
    return `${configDirectory}/syncs.json`;
  }

  _writeCron() {
    const file = this._getCronFilePath();
    const contents = this.cron.toString();
    fs.writeFileSync(file, contents);
  }

  _saveCron() {
    this._writeCron();
  }

  _deleteCron() {
    const file = this._getCronFilePath();
    if (fs.existsSync(file)) fs.rmSync(file);
  }

  _writeConfig(config: JSON) {
    const file = this._getConfigFilePath();
    fs.writeFileSync(file, JSON.stringify(config));
  }

  _readConfig() {
    const file = this._getConfigFilePath();
    if (!fs.existsSync(file)) return {};
    else return JSON.parse(fs.readFileSync(file, "utf-8"));
  }

  _saveConfig() {
    const config = this._readConfig();
    config[this.id] = {
      name: this.name,
      description: this.description,
      pattern: this.pattern
    };
    this._writeConfig(config);
  }

  _deleteConfig() {
    const config = this._readConfig();
    const { [this.id]: _, ...rest } = config;
    this._writeConfig(rest);
  }
}
