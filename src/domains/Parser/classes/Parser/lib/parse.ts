import ParserInput from "../model/ParserInput";
import ParserOptions from "../model/ParserOptions";
import ParserOutput from "../model/ParserOutput";

interface RegexMatcherDocs {
  name: string;
  examples?: string[];
}
interface RegexMatcher {
  id: number;
  pattern: RegExp;
  groupKeys: (keyof RegexMatcherResult)[];
  docs: RegexMatcherDocs;
}
interface RegexMatcherResult {
  hours?: string;
  minutes?: string;
  seconds?: string;
}
const regexes: RegexMatcher[] = [
  {
    id: 1,
    pattern: /(\d{1,2})m(\d{1,2})s?/,
    groupKeys: ["minutes", "seconds"],
    docs: {
      name: "xxmxxs",
    },
  },
  {
    id: 2,
    pattern: /(\d{1,2})/,
    groupKeys: ["seconds"],
    docs: {
      name: "number -> seconds",
    },
  },
];

function doRegex(str: string): RegexMatcherResult | undefined {
  for (const matcher of regexes) {
    const execed = matcher.pattern.exec(str);
    if (execed === null) continue;
    const entries = execed.slice(1).map((x, i) => [matcher.groupKeys[i], x]);
    const result = Object.fromEntries(entries) as RegexMatcherResult;
    return result;
  }

  return undefined;
}

export default function parse(
  input: ParserInput,
  _opt: ParserOptions
): ParserOutput {
  const { slugs } = input;
  if (slugs.length > 1) {
    throw new Error("Unimplemented");
  }

  const regexed = doRegex(slugs[0]);
  if (regexed === undefined) {
    return {
      type: "fail",
    };
  }

  let seconds = 0;
  if (regexed.hours) seconds += parseInt(regexed.hours, 10) * 3600;
  if (regexed.minutes) seconds += parseInt(regexed.minutes, 10) * 60;
  if (regexed.seconds) seconds += parseInt(regexed.seconds, 10);

  return {
    type: "success",
    timer: {
      type: "single",
      seconds,
    },
  };
}
