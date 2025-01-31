"use client";

import useSound from "@/hooks/useSound";
import useTimer from "@/hooks/useTimer";
import useOnChange from "@/snippets/useOnChange";
import useOnMount from "@/snippets/useOnMount";
import TimerSettings from "@/types/TimerSettings/TimerSettings";
import { Box } from "@mui/material";
import ControlBar from "./ControlBar";
import TimerView from "./TimerView";

export interface TimerPageProps {
  timerSettings: TimerSettings;
}

// LEFTOFF:
// -SOund
export default function TimerPage({ timerSettings }: TimerPageProps) {
  const sound = useSound({
    source: "/sound/alarm.wav",
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
      <Box sx={{ flex: 1, position: "relative" }}>
        <TimerView timer={timer} />
      </Box>
      <ControlBar timer={timer} />
    </Box>
  );
}
