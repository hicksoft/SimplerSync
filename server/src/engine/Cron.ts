/*
# ┌───────────── minute (0 - 59)
# │ ┌───────────── hour (0 - 23)
# │ │ ┌───────────── day of the month (1 - 31)
# │ │ │ ┌───────────── month (1 - 12)
# │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday;
# │ │ │ │ │                                   7 is also Sunday on some systems)
# │ │ │ │ │
# │ │ │ │ │
# * * * * * <user> <command to execute>
*/

import fs from "fs";
import { cronDirectory } from "./di";

export interface ISchedule {
  frequency: "daily" | "weekly" | "monthly";
  dayOfWeek?: string;
  dayOfMonth?: string;
  time?: {
    hour: string;
    minute: string;
  };
}

export const DEFAULT_SCHEDULE: ISchedule = {
  frequency: "daily",
  time: {
    hour: "2",
    minute: "0"
  }
};

interface Cron {}
class Cron {
  id: string;
  schedule: ISchedule;

  constructor(id: string, schedule: ISchedule) {
    this.id = id;
    this.schedule = schedule;
    this._save();
  }

  delete() {
    const path = this._buildPath();
    fs.rmSync(path);
  }

  toSerializable() {
    return this.schedule;
  }

  _save() {
    const path = this._buildPath();
    const contents = this._buildContents();
    fs.writeFileSync(path, contents);
  }

  _buildPath() {
    return `${cronDirectory}/${this.id}`;
  }

  _buildContents() {
    return [
      this._getMinute(),
      this._getHour(),
      this._getDayOfMonth(),
      this._getMonth(),
      this._getDayOfWeek(),
      this._getUser(),
      this._getCommand()
    ].join(" ");
  }

  _getMonth() {
    return "*";
  }

  _getMinute() {
    return this.schedule.time?.minute || "*";
  }

  _getHour() {
    return this.schedule.time?.hour || "*";
  }

  _getDayOfMonth() {
    return this.schedule.dayOfMonth || "*";
  }

  _getDayOfWeek() {
    return this.schedule.dayOfWeek || "*";
  }

  _getUser() {
    return "root";
  }

  _getCommand() {
    return `runner ${this.id}`;
  }
}

export default Cron;
