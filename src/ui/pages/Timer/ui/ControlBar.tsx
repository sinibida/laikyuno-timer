"use client";

import { UseTimerReturn } from "@/lib/hooks/useTimer";
import { ArrowBack, Loop, Pause, PlayArrow } from "@mui/icons-material";
import { Button, Container, Divider, Paper } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

const primaryKey = [" ", "Enter"];
const secondaryKey = ["r", "R"];
const homeKey = ["Backspace", "q"];

export default function ControlBar({ timer }: { timer: UseTimerReturn }) {
  const router = useRouter();
  const pathname = usePathname();

  const doPrimary = useCallback(() => {
    switch (timer.state) {
      case "idle":
        timer.start();
        break;
      case "running":
        timer.pause();
        break;
      case "paused":
        timer.resume();
        break;
    }
  }, [timer]);

  const doSecondary = useCallback(() => {
    timer.restart();
  }, [timer]);

  const doHome = useCallback(() => {
    const prev = pathname.substring(pathname.lastIndexOf("/") + 1);
    router.push(`/?input=${prev}`);
  }, [pathname, router]);

  const primaryButton = useMemo(() => {
    switch (timer.state) {
      case "running":
        return (
          <Button onClick={doPrimary} startIcon={<Pause />} variant="contained">
            Pause
          </Button>
        );
      case "paused":
        return (
          <Button
            onClick={doPrimary}
            startIcon={<PlayArrow />}
            variant="contained"
          >
            Resume
          </Button>
        );
      case "idle":
        return (
          <Button
            onClick={doPrimary}
            startIcon={<PlayArrow />}
            variant="contained"
          >
            Start
          </Button>
        );
    }
  }, [doPrimary, timer.state]);

  const secondaryButton = (
    <Button
      onClick={doSecondary}
      startIcon={<Loop />}
      variant="outlined"
      disabled={timer.state === "idle"}
    >
      Restart
    </Button>
  );

  const homeButton = (
    <Button startIcon={<ArrowBack />} variant="text" onClick={doHome}>
      Home
    </Button>
  );

  // Get Key Input
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (primaryKey.includes(e.key)) {
        doPrimary();
      } else if (secondaryKey.includes(e.key)) {
        doSecondary();
      } else if (homeKey.includes(e.key)) {
        doHome();
      }
    };

    window.addEventListener("keydown", fn);
    return () => {
      window.removeEventListener("keydown", fn);
    };
  }, [doHome, doPrimary, doSecondary]);

  return (
    <Paper sx={{ width: "100%" }}>
      <Container
        sx={{ display: "flex", justifyContent: "center", paddingY: 2, gap: 1 }}
      >
        {homeButton}
        <Divider orientation="vertical" flexItem />
        {secondaryButton}
        {primaryButton}
      </Container>
    </Paper>
  );
}
