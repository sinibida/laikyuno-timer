import { UseTimerReturn } from "@/hooks/useTimer/lib/useTimer";
import TimerSettings from "@/types/TimerSettings/TimerSettings";
import TimerViewData from "../model/TimerViewData";

export default function useTimerViewData(
  timer: UseTimerReturn,
  settings: TimerSettings
): TimerViewData {
  const { type } = settings;

  const common: TimerViewData["common"] = {
    initialSeconds: timer.initialSeconds,
    seconds: timer.seconds,
    state: timer.state,
  };

  const repeated: TimerViewData["repeated"] =
    type === "repeated"
      ? (() => {
          const passedLapCnt = Math.floor(
            (timer.initialSeconds - timer.seconds) / settings.secPerRepeat
          );
          const lapSeconds = timer.seconds % settings.secPerRepeat;

          return {
            passedLapCnt,
            lapSeconds,
            lapCnt: settings.times,
            secondaPerLap: settings.secPerRepeat,
          };
        })()
      : undefined;

  return {
    type,
    common,
    repeated,
  };
}
