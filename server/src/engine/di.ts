// Dependency Injection

interface IDeps {
  cronDirectory: string;
  configDirectory: string;
}

export let cronDirectory: IDeps["cronDirectory"];
export let configDirectory: IDeps["configDirectory"];

export default function inject(deps: IDeps) {
  cronDirectory = deps.cronDirectory;
  configDirectory = deps.configDirectory;
}
