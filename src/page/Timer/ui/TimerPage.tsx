import { Container, Typography } from "@mui/material";
import React from "react";

export interface TimerPageProps {
  timerParams: string[];
}

export default function TimerPage({ timerParams }: TimerPageProps) {
  return (
    <Container>
      <Typography>{JSON.stringify(timerParams)}</Typography>
    </Container>
  );
}
