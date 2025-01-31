"use client";

import useTimer from "@/hooks/useTimer";
import useOnMount from "@/snippets/useOnMount";
import { Box } from "@mui/material";
import ControlBar from "./ControlBar";
import TimerView from "./TimerView";
import TimerSettings from "@/types/TimerSettings/TimerSettings";

export interface TimerPageProps {
  timerSettings: TimerSettings;
}

// LEFTOFF:
// -SOund
// - 모델링 사진 참고해서 Parser 구현
export default function TimerPage({ timerSettings }: TimerPageProps) {
  if (timerSettings.type !== "single") {
    throw new Error("Unimplemented");
  }
  const timer = useTimer({
    initialSeconds: timerSettings.seconds,
  });

  useOnMount(() => {
    timer.start();
  }, [timer]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflowY: "hidden",
      }}
    >
      <Box sx={{ flex: 1, position: "relative" }}>
        <TimerView timer={timer} />
      </Box>
      <ControlBar timer={timer} />
    </Box>
  );
}
