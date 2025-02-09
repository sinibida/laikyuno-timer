import { UseTimerState } from "@/hooks/useTimer/lib/useTimer";
import { TimerSettingsType } from "@/types/TimerSettings";

export default interface TimerViewData {
  type: TimerSettingsType;
  common: {
    initialSeconds: number;
    seconds: number;
    state: UseTimerState;
  };
  repeated?: {
    lapCnt: number;
    secondaPerLap: number;
    lapSeconds: number;
    passedLapCnt: number;
  };
}
