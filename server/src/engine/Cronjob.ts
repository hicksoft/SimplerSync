/*
# ┌───────────── minute (0 - 59)
# │ ┌───────────── hour (0 - 23)
# │ │ ┌───────────── day of the month (1 - 31)
# │ │ │ ┌───────────── month (1 - 12)
# │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday;
# │ │ │ │ │                                   7 is also Sunday on some systems)
# │ │ │ │ │
# │ │ │ │ │
# * * * * * <user> <command to execute>
*/

export default class Cronjob {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
  user: string;
  command: string;

  constructor() {
    this.minute = "*";
    this.hour = "*";
    this.dayOfMonth = "*";
    this.month = "*";
    this.dayOfWeek = "*";
    this.user = "root";
    this.command = "";
  }

  toString() {
    return [
      this.minute,
      this.hour,
      this.dayOfMonth,
      this.month,
      this.dayOfWeek,
      this.user,
      this.command
    ].join(" ");
  }
}
