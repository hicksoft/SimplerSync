import Sync from "./Sync";
import { ISchedule } from "./Cron";
import { IJob } from "./Job";

const DEFAULT_SCHEDULE: ISchedule = {
  frequency: "daily",
  time: {
    hour: "2",
    minute: "0"
  }
};

interface ICreateProps {
  name: string;
  description: string;
}

interface IUpdateProps {
  id: string;
  name?: string;
  description?: string;
  schedule?: ISchedule;
  job?: IJob;
}

interface IDeleteProps {
  id: string;
}

interface IRunnerProps {
  id: string;
}

export function handleCreate({ name, description }: ICreateProps) {
  const schedule = DEFAULT_SCHEDULE;
  const sync = Sync.create({ name, description, schedule });
  return sync.toSerializable();
}

export function handleUpdate({
  id,
  name,
  description,
  schedule,
  job
}: IUpdateProps) {
  const sync = Sync.load(id);

  if (name) sync.updateName(name);
  if (description) sync.updateDescription(description);
  if (schedule) sync.updateSchedule(schedule);
  if (job !== null) sync.updateJob(null);

  return sync.toSerializable();
}

export function handleDelete({ id }: IDeleteProps) {
  const sync = Sync.load(id);
  sync.delete();
  return { id };
}

export function handleRunner({ id }: IRunnerProps) {
  const sync = Sync.load(id);
  sync.runJob();
}
