export interface Time {
  hour: number;
  minute: number;
}

export interface MonthlyPattern {
  frequency: "monthly";
  dayOfMonth: number;
  time: Time;
}

export interface WeeklyPattern {
  frequency: "weekly";
  dayOfWeek: number;
  time: Time;
}

export interface DailyPattern {
  frequency: "daily";
  time: Time;
}

export type Pattern = MonthlyPattern | WeeklyPattern | DailyPattern;

export const defaultDailyPattern: DailyPattern = {
  frequency: "daily",
  time: {
    hour: 2,
    minute: 0
  }
};

export const defaultWeeklyPattern: WeeklyPattern = {
  frequency: "weekly",
  dayOfWeek: 6,
  time: {
    hour: 2,
    minute: 0
  }
};

export const defaultMonthlyPattern: MonthlyPattern = {
  frequency: "monthly",
  dayOfMonth: 1,
  time: {
    hour: 2,
    minute: 0
  }
};
