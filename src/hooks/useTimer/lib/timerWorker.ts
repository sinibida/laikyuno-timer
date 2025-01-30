import TimerMessageIn from "../model/TimerMessageIn";
import TimerMessageOut from "../model/TimerMessageOut";

function postMessage(message: TimerMessageOut) {
  global.postMessage(message);
}

let timeout: NodeJS.Timeout | undefined;
const interval = 50;

function work(message: TimerMessageIn) {
  switch (message.type) {
    case "on":
      {
        timeout = setInterval(() => {
          postMessage({
            type: "tick",
            interval,
          });
        }, interval);
      }
      break;
    case "off":
      {
        clearInterval(timeout);
      }
      break;
  }

  return {
    stub: `INPUT: ${message.type}`,
  };
}

onmessage = (e: MessageEvent<TimerMessageIn>) => {
  work(e.data);
};
