import inject from "../src/engine/di";

const cronDirectory = "test/mock/cron.d";
const configDirectory = "test/mock/config";

inject({ cronDirectory, configDirectory });
