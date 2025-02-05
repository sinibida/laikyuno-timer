type ArgsRequirement = {
  type: string;
};
type TimerSettingsTemplate<
  Args extends ArgsRequirement,
  Custom extends object = object
> = {
  type: Args["type"];
  /**
   * supplyment info for unsupported timer settings
   */
  totalSeconds: number;
} & Custom;

type SingleTimerSettings = TimerSettingsTemplate<
  {
    type: "single";
  },
  {
    seconds: number;
  }
>;

type RepeatedTimerSettings = TimerSettingsTemplate<
  {
    type: "repeated";
  },
  {
    secPerRepeat: number;
    times: number;
  }
>;

type TimerSettings = SingleTimerSettings | RepeatedTimerSettings;
export type TimerSettingsType = TimerSettings["type"];

export default TimerSettings;
