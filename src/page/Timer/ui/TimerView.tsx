"use client";

import { UseTimerReturn } from "@/hooks/useTimer";
import fromSeconds from "@/shared/snippets/fromSeconds";
import mergeSx from "@/shared/snippets/mergeSx";
import { Box, Container, Typography } from "@mui/material";
import { format } from "date-fns";
import { useMemo } from "react";

// LATER: will be replacable
export default function TimerView({ timer }: { timer: UseTimerReturn }) {
  const timerText = useMemo(() => {
    if (timer.state === "idle") {
      return "! DONE !";
    }

    const t = fromSeconds(timer.seconds);
    if (timer.seconds >= 3600) return format(t, "hh:mm:ss");
    if (timer.seconds >= 60) return format(t, "mm:ss");
    return format(t, "ss");
  }, [timer.seconds, timer.state]);
  const progress = useMemo(
    () => 1 - timer.seconds / timer.initialSeconds,
    [timer.initialSeconds, timer.seconds]
  );
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      {timer.state !== "idle" && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            top: `${progress * 100}%`,
            backdropFilter: "invert()",
            transition: "all 100ms",
          }}
        />
      )}
      <Typography
        variant={timer.state === "paused" ? "h3" : "h1"}
        sx={mergeSx(
          { transition: "all 250ms" },
          timer.state === "paused" && { fontWeight: 300 }
        )}
        color={timer.state !== "running" ? "primary" : undefined}
        component="p"
      >
        {timerText}
      </Typography>
    </Container>
  );
}
