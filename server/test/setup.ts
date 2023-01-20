import inject from "../src/engine/di";

const cronDirectory = "test/mock/cron.d";
const configSyncs = "test/mock/config";

inject({ cronDirectory, configSyncs });
