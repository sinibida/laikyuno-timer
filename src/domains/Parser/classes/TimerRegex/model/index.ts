export interface TimerRegexData {
  pattern: RegExp;
  groupKeys: (keyof TimerRegexResult)[];
}
export interface TimerRegexResult {
  hours?: string;
  minutes?: string;
  seconds?: string;
  times?: string;
}
