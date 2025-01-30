"use client";

import { useEffect, useRef, useState } from "react";
import TimerMessageOut from "../model/TimerMessageOut";
import TimerMessageIn from "../model/TimerMessageIn";

export type UseTimerState = "running" | "paused" | "idle";

export type UseTimerReturn = {
  /**
   * alias of `restart`
   */
  start: () => void;
  restart: () => void;
  pause: () => void;
  resume: () => void;

  seconds: number;
  state: UseTimerState;
};

export default function useTimer(): UseTimerReturn {
  const [seconds, setSeconds] = useState(0);
  const [state, setState] = useState<UseTimerState>("idle");
  const workerRef = useRef<Worker>(undefined!);

  const onMessageRef = useRef((message: TimerMessageOut): void => {
    // STUB
    console.log(message.stub);
  });

  const postMessageRef = useRef((message: TimerMessageIn) => {
    workerRef.current.postMessage(message);
  });

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("./timerWorker.ts", import.meta.url)
    );

    workerRef.current.onmessage = (e) => {
      onMessageRef.current(e.data);
    };

    return () => {
      workerRef.current.terminate();
    };
  }, []);

  const restart = () => {
    postMessageRef.current({
      stub: "Hello World",
    });
  };
  const pause = () => {};
  const resume = () => {};

  return {
    seconds,
    state,
    start: restart,
    restart,
    pause,
    resume,
  };
}
