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
