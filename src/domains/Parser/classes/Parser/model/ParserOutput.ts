import TimerSettings from "@/model/types/TimerSettings/TimerSettings";

export interface SuccessParserOutput {
  type: "success";
  timer: TimerSettings;
}

export interface FailParserOutput {
  type: "fail";
}

type ParserOutput = SuccessParserOutput | FailParserOutput;

export default ParserOutput;
