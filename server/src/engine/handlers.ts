import Sync from "./Sync";
import { ISchedule, DEFAULT_SCHEDULE } from "./Cron";
import { IJob, DEFAULT_JOB } from "./Job";

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
  const job = DEFAULT_JOB;
  const sync = Sync.create({ name, description, schedule, job });
  return sync.toSerializable();
}

export function handleGetAll() {
  const allSyncs = Sync.loadAll();
  return allSyncs.map((sync) => sync.toSerializable());
}

export function handleUpdate({ id, ...fields }: IUpdateProps) {
  const sync = Sync.load(id);
  if (!sync) return undefined;

  if (fields.name) sync.updateName(fields.name);
  if (fields.description) sync.updateDescription(fields.description);
  if (fields.schedule) sync.updateSchedule(fields.schedule);
  if (fields.job) sync.updateJob(fields.job);

  return sync.toSerializable();
}

export function handleDelete({ id }: IDeleteProps) {
  const sync = Sync.load(id);
  if (!sync) return undefined;

  sync.delete();
  return { id };
}

export function handleRunner({ id }: IRunnerProps) {
  const sync = Sync.load(id);
  if (!sync) return;
  sync.runJob();
}
