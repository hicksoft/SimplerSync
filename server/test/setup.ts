import fs from "fs";

import inject from "../src/engine/di";

const cronDirectory = "test/mock/cron.d";
const configDirectory = "test/mock/config";

inject({ cronDirectory, configDirectory });

export function resetMockDirs() {
  resetMockDir(configDirectory);
  resetMockDir(cronDirectory);
}

function resetMockDir(dir: string) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true });
  fs.mkdirSync(dir, { recursive: true });
}
