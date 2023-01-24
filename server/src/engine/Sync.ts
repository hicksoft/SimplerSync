import { v4 as uuid } from "uuid";

import Config from "./config";
import Cron, { ISchedule } from "./Cron";
import Job, { IJob } from "./Job";

interface ISync {
  id: string;
  name: string;
  description: string;
  schedule: ISchedule;
  job?: IJob;
}

class Sync {
  id: string;
  name: string;
  description: string;
  cron: Cron;
  job: Job | null;

  static create(props: Omit<ISync, "id">) {
    const id = uuid();
    const sync = new Sync({ id, ...props });
    sync._save();
    return sync;
  }

  static load(id: ISync["id"]) {
    const config = Config.get(id);
    return new Sync(config);
  }

  constructor(props: ISync) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.cron = new Cron(props.id, props.schedule);
    this.job = props.job ? new Job(props.job) : null;
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

  updateJob(job: IJob | null) {
    this.job = job ? new Job(job) : null;
    this._save();
  }

  toSerializable() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      schedule: this.cron.toSerializable(),
      job: this.job ? this.job.toSerializable() : this.job
    };
  }

  delete() {
    this.cron.delete();
    Config.remove(this.id);
  }

  runJob() {
    if (this.job) this.job.run();
  }

  _save() {
    const { id, ...rest } = this.toSerializable();
    Config.save(id, rest);
  }
}

export default Sync;
