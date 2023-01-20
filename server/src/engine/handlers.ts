import Sync from "./Sync";
import { DailyPattern } from "./patterns";

export function handleCreate(name: string, description: string) {
  const defaultPattern: DailyPattern = {
    frequency: "daily",
    time: {
      hour: 2,
      minute: 0
    }
  };

  const sync = new Sync({ name, description, pattern: defaultPattern });
  sync.save();

  //return sync.toJson();
}
