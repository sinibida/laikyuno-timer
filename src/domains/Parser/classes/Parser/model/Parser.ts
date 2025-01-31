import ParserInput from "./ParserInput";
import ParserOptions from "./ParserOptions";
import ParserOutput from "./ParserOutput";
import _parse from "../lib/parse";

export default class Parser {
  opt: ParserOptions;

  constructor(opt: ParserOptions) {
    this.opt = opt;
  }

  parse(input: ParserInput): ParserOutput {
    return _parse(input, this.opt);
  }
}
