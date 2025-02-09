"use client";

import useOnChange from "@/hooks/useOnChange";
import useOnMount from "@/hooks/useOnMount";
import useSound from "@/hooks/useSound";
import useTimer from "@/hooks/useTimer";
import NullSnackbar from "@/snippets/NullSnackbar";
import TimerSettings, {
  TimerSettingsType,
} from "@/types/TimerSettings/TimerSettings";
import { Alert, AlertTitle, Box } from "@mui/material";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import ControlBar from "./ControlBar";
import TimerView from "./TimerView";

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
        <TimerView timer={timer} timerSettings={timerSettings} />
      </Box>
      <ControlBar timer={timer} />
    </Box>
  );
}
