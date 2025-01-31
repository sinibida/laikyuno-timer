import ParserInput from "../model/ParserInput";
import ParserOptions from "../model/ParserOptions";
import ParserOutput from "../model/ParserOutput";

const x: (keyof RegexMatcherResult)[] = [""];

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
    pattern: /(\d{1,2})m(\d{1,2})s/,
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

export default function parse(
  input: ParserInput,
  opt: ParserOptions
): ParserOutput {
  const { slugs } = input;
  if (slugs.length > 1) {
    throw new Error("Unimplemented");
  }

  
}
