import TimerPage from "@/page/Timer";
import React from "react";

type Params = {
  timerParams: string[];
};

export default async function Page({ params }: { params: Promise<Params> }) {
  const { timerParams } = await params;
  return <TimerPage timerParams={timerParams} />;
}
