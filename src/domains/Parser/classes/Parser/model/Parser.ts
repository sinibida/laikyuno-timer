import ParserInput from "./ParserInput";
import ParserOptions, { defaultParserOptions } from "./ParserOptions";
import ParserOutput from "./ParserOutput";
import _parse from "../lib/parse";

export default class Parser {
  private opt: ParserOptions;

  constructor(opt: ParserOptions = defaultParserOptions) {
    this.opt = opt;
  }

  parse(input: ParserInput): ParserOutput {
    return _parse(input, this.opt);
  }
}
