import { v4 as uuid } from "uuid";

import Config from "./config";
import Cron, { ISchedule } from "./Cron";
import Job, { IJob } from "./Job";

interface ISync {
  id: string;
  name: string;
  description: string;
  schedule: ISchedule;
  job: IJob;
}

class Sync {
  id: string;
  name: string;
  description: string;
  cron: Cron;
  job: Job;

  static create(props: Omit<ISync, "id">) {
    const id = uuid();
    const sync = new Sync({ id, ...props });
    sync._save();
    return sync;
  }

  static load(id: string) {
    const config = Config.get(id);
    return config ? new Sync({ id, ...config }) : null;
  }

  static loadAll() {
    const config = Config.getAll();
    return Object.keys(config).map((id) => new Sync({ id, ...config[id] }));
  }

  constructor(props: ISync) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.cron = new Cron(props.id, props.schedule);
    this.job = new Job(props.job);
  }

  updateName(name: string) {
    this.name = name;
    this._save();
  }

  updateDescription(description: string) {
    this.description = description;
    this._save();
  }

  updateSchedule(schedule: ISchedule) {
    this.cron = new Cron(this.id, schedule);
    this._save();
  }

  updateJob(job: IJob) {
    this.job = new Job(job);
    this._save();
  }

  toSerializable() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      schedule: this.cron.toSerializable(),
      job: this.job.toSerializable()
    };
  }

  delete() {
    this.cron.delete();
    Config.remove(this.id);
  }

  runJob() {
    this.job.run();
  }

  _save() {
    const { id, ...rest } = this.toSerializable();
    Config.save(id, rest);
  }
}

export default Sync;
