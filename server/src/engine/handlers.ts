import Sync from "./Sync";
import { defaultDailyPattern, Pattern } from "./patterns";

interface ICreateProps {
  name: string;
  description: string;
}

interface IUpdateProps {
  id: string;
  name?: string;
  description?: string;
  pattern?: Pattern;
}

interface IDeleteProps {
  id: string;
}

interface IRunnerProps {
  id: string;
}

export function handleCreate({ name, description }: ICreateProps) {
  const pattern = defaultDailyPattern;
  const sync = new Sync({ name, description, pattern });
  sync.save();
  return sync.toJson();
}

export function handleUpdate({ id, name, description, pattern }: IUpdateProps) {
  const sync = new Sync({ id });

  if (name) sync.setName(name);
  if (description) sync.setDescription(description);
  if (pattern) sync.setPattern(pattern);

  sync.save();
  return sync.toJson();
}

export function handleDelete({ id }: IDeleteProps) {
  const sync = new Sync({ id });
  sync.delete();
  return { id };
}

export function handleRunner({ id }: IRunnerProps) {
  const sync = new Sync({ id });
}
