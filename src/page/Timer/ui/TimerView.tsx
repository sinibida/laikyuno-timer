"use client";

import { TimerViewData } from "@/hooks/useTimerViewData";
import fromSeconds from "@/snippets/fromSeconds";
import mergeSx from "@/snippets/mergeSx";
import { Box, Container, Typography } from "@mui/material";
import { format } from "date-fns";
import Head from "next/head";
import { useEffect, useMemo } from "react";

function formatSeconds(seconds: number) {
  if (seconds <= 5)
    return `${Math.floor(seconds)}.${Math.floor((seconds % 1) * 10)}`;

  const t = fromSeconds(Math.floor(seconds));
  if (seconds >= 3600) return format(t, "hh:mm:ss");
  if (seconds >= 60) return format(t, "mm:ss");
  return format(t, "ss");
}

// LATER: will be replacable
export default function TimerView({ data }: { data: TimerViewData }) {
  const timerText = useMemo(() => {
    if (data.common.state === "idle") {
      return "! DONE !";
    }

    return formatSeconds(data.common.seconds);
  }, [data.common.seconds, data.common.state]);

  const progress = useMemo(
    () => 1 - data.common.seconds / data.common.initialSeconds,
    [data.common.initialSeconds, data.common.seconds]
  );

  useEffect(() => {
    document.title = timerText;
  }, [timerText]);

  const repeatText: string | undefined = useMemo(() => {
    if (data.type !== "repeated") return undefined;

    const { lapSeconds, lapCnt, passedLapCnt } = data.repeated!;

    return `${formatSeconds(lapSeconds)} (${passedLapCnt}/${lapCnt})`;
  }, [data.repeated, data.type]);

  return (
    <>
      <Head>
        <title>{timerText}</title>
      </Head>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          flexDirection: "column",
        }}
      >
        {data.common.state !== "idle" && (
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
          variant={data.common.state === "paused" ? "h3" : "h1"}
          sx={mergeSx(
            { transition: "all 250ms" },
            data.common.state === "paused" && { fontWeight: 300 }
          )}
          color={data.common.state !== "running" ? "primary" : undefined}
          component="p"
        >
          {timerText}
        </Typography>
        {repeatText && (
          <Typography variant="h5" sx={{ fontWeight: 300 }}>
            {repeatText}
          </Typography>
        )}
      </Container>
    </>
  );
}
