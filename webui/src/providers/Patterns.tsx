export interface Time {
  hour: number;
  minute: number;
}

interface MonthlyPattern {
  everyXMonths: number;
  time: Time;
}

export interface MonthlyPatternFixed extends MonthlyPattern {
  frequency: "monthly_fixed";
  dayOfMonth: number;
}

export interface MonthlyPatternDynamic extends MonthlyPattern {
  frequency: "monthly_dynamic";
  week: "first" | "second" | "third" | "fourth" | "last";
  dayOfWeek: number;
}

export interface WeeklyPattern {
  frequency: "weekly";
  everyXWeeks: number;
  daysOfWeek: Array<number>;
  time: Time;
}

export interface DailyPattern {
  frequency: "daily";
  everyXDays: number;
  time: Time;
}

export interface HourlyPattern {
  frequency: "hourly";
  hoursOfDay: Array<number>;
  minuteOfHour: number;
}

export type Pattern =
  | MonthlyPatternFixed
  | MonthlyPatternDynamic
  | WeeklyPattern
  | DailyPattern
  | HourlyPattern;
