import { Container, Typography } from "@mui/material";
import React from "react";

export interface TimerPageProps {
  timerParams: string[];
}

// LEFTOFF: 
// 1.
// 컴포넌트 디자인 사이트 구현
//
// 2.
// Web-Worker 개발 환경 구현하기
// https://medium.com/@ngrato/harnessing-the-power-of-web-workers-with-next-js-350901a99a10
// 
// 3.
// 모델링 사진 참고해서 Parser 구현
export default function TimerPage({ timerParams }: TimerPageProps) {
  return (
    <Container>
      <Typography>{JSON.stringify(timerParams)}</Typography>
    </Container>
  );
}
