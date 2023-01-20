import Sync from "./Sync";
import { defaultDailyPattern } from "./patterns";

export function handleCreate(name: string, description: string) {
  const pattern = defaultDailyPattern;
  const sync = new Sync({ name, description, pattern });
  sync.save();
  return sync.toJson();
}
