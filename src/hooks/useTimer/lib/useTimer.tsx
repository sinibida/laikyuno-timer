"use client";

import { useEffect, useRef, useState } from "react";
import TimerMessageOut from "../model/TimerMessageOut";
import TimerMessageIn from "../model/TimerMessageIn";
import { TIMER_EPSILON } from "../model/consts";

export type UseTimerState = "running" | "paused" | "idle";

export type UseTimerReturn = {
  /**
   * alias of `restart`
   */
  start: () => void;
  restart: () => void;
  pause: () => void;
  resume: () => void;

  initialSeconds: number;
  seconds: number;
  state: UseTimerState;
};

export type UseTimerProps = {
  initialSeconds: number;
};

export default function useTimer({
  initialSeconds,
}: UseTimerProps): UseTimerReturn {
  const [seconds, setSeconds] = useState(0);
  const [state, setState] = useState<UseTimerState>("idle");
  const workerRef = useRef<Worker>(undefined!);

  const onMessageRef = useRef((message: TimerMessageOut): void => {
    switch (message.type) {
      case "tick":
        setSeconds((x) => x - message.interval / 1000);
        break;
    }
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
    setState("running");
    setSeconds(initialSeconds);
    postMessageRef.current({
      type: "on",
    });
  };
  const pause = () => {
    setState("paused");
    postMessageRef.current({
      type: "off",
    });
  };
  const resume = () => {
    setState("running");
    postMessageRef.current({
      type: "on",
    });
  };
  const done = () => {
    setState("idle");
    postMessageRef.current({
      type: "off",
    });
  };

  useEffect(() => {
    if (seconds <= TIMER_EPSILON) {
      setSeconds(0);
      done();
    }
  }, [seconds]);

  return {
    initialSeconds,
    seconds,
    state,
    start: restart,
    restart,
    pause,
    resume,
  };
}
