// https://linux.die.net/man/1/rsync
/*
Local:  rsync [OPTION...] SRC... [DEST]
Access via remote shell:
  Pull: rsync [OPTION...] [USER@]HOST:SRC... [DEST]
  Push: rsync [OPTION...] SRC... [USER@]HOST:DEST
Access via rsync daemon:
  Pull: rsync [OPTION...] [USER@]HOST::SRC... [DEST]
        rsync [OPTION...] rsync://[USER@]HOST[:PORT]/SRC... [DEST]
  Push: rsync [OPTION...] SRC... [USER@]HOST::DEST
        rsync [OPTION...] SRC... rsync://[USER@]HOST[:PORT]/DEST
*/

import { exec } from "child_process";

enum Mode {
  Local = "local",
  ShellPush = "remote-shell-push",
  ShellPull = "remote-shell-pull",
  DaemonPush = "remote-daemon-push",
  DaemonPull = "remote-daemon-pull"
}

interface IOptions {
  [key: string]: boolean | string;
}

export interface IJob {
  mode: Mode;
  options: IOptions;
  user: string;
  host: string;
  port: string;
  src: Array<string>;
  dest: string;
}

export const DEFAULT_JOB: IJob = {
  mode: Mode.Local,
  options: {},
  user: "",
  host: "",
  port: "",
  src: [],
  dest: ""
};

class Job {
  settings: IJob;

  static Mode = Mode;

  constructor(settings: IJob) {
    this.settings = settings;
  }

  run() {
    if (this.settings.src.length === 0 || this.settings.dest.length === 0)
      return;
    const command = this._buildCommand();
    exec(command);
  }

  toSerializable() {
    return this.settings;
  }

  _buildCommand() {
    const opts = this._buildOptions();
    const src = this._buildSource();
    const dest = this._buildDest();

    return `rsync ${opts}${src} ${dest}`;
  }

  _buildSource() {
    switch (this.settings.mode) {
      case Mode.Local:
      case Mode.ShellPush:
      case Mode.DaemonPush:
        return this.settings.src.join(" ");

      case Mode.ShellPull:
        return this.settings.src
          .map((src) => this._buildShellLocation(src))
          .join(" ");

      case Mode.DaemonPull:
        return this.settings.src
          .map((src) => this._buildDaemonLocation(src))
          .join(" ");
    }
  }

  _buildDest() {
    switch (this.settings.mode) {
      case Mode.Local:
      case Mode.ShellPull:
      case Mode.DaemonPull:
        return this.settings.dest;

      case Mode.ShellPush:
        return this._buildShellLocation(this.settings.dest);

      case Mode.DaemonPush:
        return this._buildDaemonLocation(this.settings.dest);
    }
  }

  _buildShellLocation(location: string) {
    const host = this._buildHost();
    return `${host}:${location}`;
  }

  _buildDaemonLocation(location: string) {
    const host = this._buildHost();
    const port = this.settings.port ? `:${this.settings.port}` : "";
    return `rsync://${host}${port}/${location}`;
  }

  _buildHost() {
    if (this.settings.user)
      return `${this.settings.user}@${this.settings.host}`;
    else return this.settings.host;
  }

  _buildOptions() {
    return Object.keys(this.settings.options).reduce((result, optionKey) => {
      const option = this.settings.options[optionKey];
      switch (typeof option) {
        case "boolean":
          return option ? `${result}--${optionKey} ` : result;

        case "string":
          return option.length > 0
            ? `${result}--${optionKey}=${option} `
            : result;
      }
    }, "");
  }
}

export default Job;
