"use client";

import { UseTimerReturn } from "@/hooks/useTimer";
import { Box, Container, Typography } from "@mui/material";
import React, { useMemo } from "react";

// LATER: will be replacable
export default function TimerView({ timer }: { timer: UseTimerReturn }) {
  const timerText = useMemo(
    () => `${Math.ceil(timer.seconds)}s`,
    [timer.seconds]
  );
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
        variant="h1"
        sx={{ transition: "all 250ms" }}
        color={timer.state !== "running" ? "primary" : undefined}
      >
        {timerText}
      </Typography>
    </Container>
  );
}
