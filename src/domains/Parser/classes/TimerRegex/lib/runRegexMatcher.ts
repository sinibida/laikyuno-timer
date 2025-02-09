import { TimerRegexData, TimerRegexResult } from "../model";

export default function runTimerRegex(
  data: TimerRegexData,
  str: string
): TimerRegexResult | undefined {
  const execed = data.pattern.exec(str);
  if (execed === null) return undefined;
  const entries = execed.slice(1).map((x, i) => [data.groupKeys[i], x]);
  const result = Object.fromEntries(entries) as TimerRegexResult;
  return result;
}
