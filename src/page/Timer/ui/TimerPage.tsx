"use client";

import useTimer from "@/hooks/useTimer";
import useOnMount from "@/snippets/useOnMount";
import { Box } from "@mui/material";
import ControlBar from "./ControlBar";
import TimerView from "./TimerView";

export interface TimerPageProps {
  timerParams: string[];
}

// LEFTOFF:
// -SOund
// - 모델링 사진 참고해서 Parser 구현
export default function TimerPage({ timerParams }: TimerPageProps) {
  const timer = useTimer({ initialSeconds: parseInt(timerParams[0], 10) });

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
