import { addSeconds } from "date-fns";

const MINUS_9_HOUR = 3600 * -9 * 1000;

// https://stackoverflow.com/a/49190901
export default function fromSeconds(seconds: number): Date {
  return addSeconds(MINUS_9_HOUR, seconds);
}
