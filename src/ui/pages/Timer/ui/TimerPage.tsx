"use client";

import useOnChange from "@/lib/hooks/useOnChange";
import useOnMount from "@/lib/hooks/useOnMount";
import useSound from "@/lib/hooks/useSound";
import useTimer from "@/lib/hooks/useTimer";
import NullSnackbar from "@/lib/snippets/NullSnackbar";
import TimerSettings, {
  TimerSettingsType,
} from "@/model/types/TimerSettings/TimerSettings";
import { Alert, AlertTitle, Box } from "@mui/material";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import ControlBar from "./ControlBar";
import TimerView from "./TimerView";
import useTimerViewData from "@/lib/hooks/useTimerViewData";

export interface TimerPageProps {
  timerSettings: TimerSettings;
}

// LATER: capsule this
const supportedTypes: TimerSettingsType[] = ["repeated", "single"];
function useTimerSettings(settings: TimerSettings) {
  if (!supportedTypes.includes(settings.type)) {
    settings = {
      type: "single",
      totalSeconds: settings.totalSeconds,
      seconds: settings.totalSeconds,
    };
  }

  const initialSeconds = (() => {
    switch (settings.type) {
      case "single":
        return settings.seconds;
      case "repeated":
        return settings.secPerRepeat * settings.times;
    }
  })();

  const timer = useTimer({
    initialSeconds,
  });
  return { timer };
}

const autoplayErrorAlert = (
  <Alert severity="error">
    <AlertTitle>자동재생이 비활성화되어 있습니다.</AlertTitle>
    알람 소리 재생을 위해선 자동재생을 허용해야합니다. 브라우저 환경설정을
    확인해주세요.
  </Alert>
);

export default function TimerPage({ timerSettings }: TimerPageProps) {
  const onAutoplayErrorDetected = () => {
    enqueueSnackbar({
      message: autoplayErrorAlert,
    });
  };

  const sound = useSound({
    source: "/sound/alarm.wav",
    onAutoplayErrorDetected,
  });

  const { timer } = useTimerSettings(timerSettings);

  useOnMount(() => {
    timer.start();
  }, [timer]);

  useOnChange(
    (before) => {
      if (before == "running" && timer.state === "idle") {
        sound.play();
      }

      if (before == "idle" && timer.state == "running") {
        sound.inturrupt();
      }
    },
    [sound, timer.state],
    timer.state
  );

  const timerViewData = useTimerViewData(timer, timerSettings);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflowY: "hidden",
      }}
    >
      <SnackbarProvider Components={{ default: NullSnackbar }} />
      <Box sx={{ flex: 1, position: "relative" }}>
        <TimerView data={timerViewData} />
      </Box>
      <ControlBar timer={timer} />
    </Box>
  );
}
