import { TimerRegexData } from "../../TimerRegex";

const regexes: TimerRegexData[] = [
  {
    pattern: /(\d+)m(\d+)s?x(\d+)/,
    groupKeys: ["minutes", "seconds", "times"],
  },
  {
    pattern: /(\d+)x(\d+)/,
    groupKeys: ["seconds", "times"],
  },
  {
    pattern: /(\d+)m(\d+)s?/,
    groupKeys: ["minutes", "seconds"],
  },
  {
    pattern: /(\d+)/,
    groupKeys: ["seconds"],
  },
];

export default regexes;
