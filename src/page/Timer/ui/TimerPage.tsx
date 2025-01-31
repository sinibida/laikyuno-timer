"use client";

import useSound from "@/hooks/useSound";
import useTimer from "@/hooks/useTimer";
import NullSnackbar from "@/snippets/NullSnackbar";
import useOnChange from "@/snippets/useOnChange";
import useOnMount from "@/snippets/useOnMount";
import TimerSettings from "@/types/TimerSettings/TimerSettings";
import { Alert, AlertTitle, Box } from "@mui/material";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import ControlBar from "./ControlBar";
import TimerView from "./TimerView";

export interface TimerPageProps {
  timerSettings: TimerSettings;
}

// LEFTOFF:
// -SOund
export default function TimerPage({ timerSettings }: TimerPageProps) {
  const onAutoplayErrorDetected = () => {
    enqueueSnackbar({
      variant: undefined,
      message: (
        <Alert severity="error">
          <AlertTitle>자동재생이 비활성화되어 있습니다.</AlertTitle>
          알람 소리 재생을 위해선 자동재생을 허용해야합니다. 브라우저 환경설정을
          확인해주세요.
        </Alert>
      ),
    });
  };

  const sound = useSound({
    source: "/sound/alarm.wav",
    onAutoplayErrorDetected,
  });

  if (timerSettings.type !== "single") {
    throw new Error("Unimplemented");
  }
  const timer = useTimer({
    initialSeconds: timerSettings.seconds,
  });

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
        <TimerView timer={timer} />
      </Box>
      <ControlBar timer={timer} />
    </Box>
  );
}
