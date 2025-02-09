import { runTimerRegex, TimerRegexResult } from "../../TimerRegex";
import fromRegexResultToOutput from "../lib/fromRegexResultToOutput";
import regexes from "../lib/regexes";
import ParserInput from "./ParserInput";
import ParserOptions, { defaultParserOptions } from "./ParserOptions";
import ParserOutput from "./ParserOutput";

function doRegex(str: string): TimerRegexResult | undefined {
  for (const regex of regexes) {
    const res = runTimerRegex(regex, str);
    if (res) return res;
  }

  return undefined;
}

export default class Parser {
  private opt: ParserOptions;

  constructor(opt: ParserOptions = defaultParserOptions) {
    this.opt = opt;
  }

  parse(input: ParserInput): ParserOutput {
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

    const output = fromRegexResultToOutput(regexed);

    return output;
  }
}
