import TimerMessageIn from "../model/TimerMessageIn";
import TimerMessageOut from "../model/TimerMessageOut";

function work(message: TimerMessageIn): TimerMessageOut {
  return {
    stub: `INPUT: ${message.stub}`,
  };
}

onmessage = (e: MessageEvent<TimerMessageIn>) => {
  postMessage(work(e.data));
};
