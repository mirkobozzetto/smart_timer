export type TimeUnit = "hours" | "minutes" | "seconds";
export type TimeDirection = "left" | "right";

export type ShortLabel = "h" | "min" | "sec";

export const shortLabelToTimeUnit: Record<ShortLabel, TimeUnit> = {
  h: "hours",
  min: "minutes",
  sec: "seconds",
};

export const timeUnitToShortLabel: Record<TimeUnit, ShortLabel> = {
  hours: "h",
  minutes: "min",
  seconds: "sec",
};
