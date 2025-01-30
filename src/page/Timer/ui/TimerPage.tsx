"use client";

import useTimer from "@/hooks/useTimer/lib/useTimer";
import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { Context, ContextType } from "../model/context";

export interface TimerPageProps {
  timerParams: string[];
}

// LEFTOFF:
// 2.
// Web-Worker 개발 환경 구현하기
// https://medium.com/@ngrato/harnessing-the-power-of-web-workers-with-next-js-350901a99a10
//
// 3.
// 모델링 사진 참고해서 Parser 구현
export default function TimerPage({ timerParams }: TimerPageProps) {
  const timer = useTimer();

  // STUB
  const onStartClick = () => {
    timer.start();
  };

  const contextValue: ContextType = {
    timer,
  };

  return (
    <Context.Provider value={contextValue}>
      <Container>
        <Typography>{JSON.stringify(timerParams)}</Typography>
        <Button onClick={onStartClick}>Hello</Button>
      </Container>
    </Context.Provider>
  );
}
