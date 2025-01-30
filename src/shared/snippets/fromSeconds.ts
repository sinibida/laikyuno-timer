import { addSeconds } from "date-fns";

// https://stackoverflow.com/a/49190901
export default function fromSeconds(seconds: number): Date {
  return addSeconds(0, seconds);
}
