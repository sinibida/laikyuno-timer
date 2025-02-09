import { TimerRegexResult } from "../../TimerRegex";
import ParserOutput from "../model/ParserOutput";

export default function fromRegexResultToOutput(
  regexed: TimerRegexResult
): ParserOutput {
  let seconds = 0;
  if (regexed.hours) seconds += parseInt(regexed.hours, 10) * 3600;
  if (regexed.minutes) seconds += parseInt(regexed.minutes, 10) * 60;
  if (regexed.seconds) seconds += parseInt(regexed.seconds, 10);

  if (regexed.times) {
    const parsedTimes = parseInt(regexed.times);
    return {
      type: "success",
      timer: {
        type: "repeated",
        secPerRepeat: seconds,
        times: parsedTimes,
        totalSeconds: seconds * parsedTimes,
      },
    };
  }

  return {
    type: "success",
    timer: {
      type: "single",
      totalSeconds: seconds,
      seconds,
    },
  };
}
