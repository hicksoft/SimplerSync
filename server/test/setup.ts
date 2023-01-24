import fs from "fs";

import inject from "../src/engine/di";

const cronDirectory = "test/mock/cron.d";
const configDirectory = "test/mock/config";

inject({ cronDirectory, configDirectory });

export function resetDirectories() {
  resetDirectory(configDirectory);
  resetDirectory(cronDirectory);
}

function resetDirectory(dir: string) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true });
  fs.mkdirSync(dir, { recursive: true });
}
