import { TimerRegexData } from "../../TimerRegex";

// https://stackoverflow.com/a/59488150
const concat = (...datas: TimerRegexData[]): TimerRegexData => ({
  pattern: new RegExp(datas.map((data) => data.pattern.source).join("")),
  groupKeys: datas.map((x) => x.groupKeys).flat(),
});

const timeRegex: TimerRegexData = {
  pattern: /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?/,
  groupKeys: ["hours", "minutes", "seconds"],
};

const regexes: TimerRegexData[] = [
  concat(timeRegex, {
    pattern: /x(\d+)/,
    groupKeys: ["times"],
  }),
  timeRegex,
];

export default regexes;
