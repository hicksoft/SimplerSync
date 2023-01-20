import Cronjob from "./Cronjob";

import {
  Pattern,
  MonthlyPattern,
  WeeklyPattern,
  DailyPattern
} from "./patterns";

export default function cronjobFactory(pattern: Pattern): Cronjob {
  switch (pattern.frequency) {
    case "daily":
      return new DailyCronjob(pattern);
    case "weekly":
      return new WeeklyCronjob(pattern);
    case "monthly":
      return new MonthlyCronjob(pattern);
  }
}

class DailyCronjob extends Cronjob {
  constructor(pattern: DailyPattern) {
    super();
    this.hour = pattern.time.hour.toString();
    this.minute = pattern.time.minute.toString();
  }
}

class WeeklyCronjob extends Cronjob {
  constructor(pattern: WeeklyPattern) {
    super();
    this.dayOfWeek = pattern.dayOfWeek.toString();
    this.hour = pattern.time.hour.toString();
    this.minute = pattern.time.minute.toString();
  }
}

class MonthlyCronjob extends Cronjob {
  constructor(pattern: MonthlyPattern) {
    super();
    this.dayOfMonth = pattern.dayOfMonth.toString();
    this.hour = pattern.time.hour.toString();
    this.minute = pattern.time.minute.toString();
  }
}
