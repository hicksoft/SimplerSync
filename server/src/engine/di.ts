// Dependency Injection

interface IDeps {
  cronDirectory?: string;
  configSyncs?: string;
}

export let cronDirectory: IDeps["cronDirectory"];
export let configSyncs: IDeps["configSyncs"];

export default function inject(deps: IDeps) {
  cronDirectory = deps.cronDirectory;
  configSyncs = deps.configSyncs;
}
