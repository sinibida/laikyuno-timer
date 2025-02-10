import TimerSettings from "@/model/types/TimerSettings/TimerSettings";
import Parser from "./Parser";
import { describe, expect, it } from "vitest";
import ParserOutput from "./ParserOutput";

function parseSingleSlug(slug: string) {
  const parser = new Parser();
  const res = parser.parse({ slugs: [slug] });
  return res;
}

/*
10m30
10m
10x30
10m30x30
10m30sx30
10mx30
*/
const data: Array<{ x: string; y: TimerSettings }> = [
  {
    x: "10m30",
    y: {
      type: "single",
      seconds: 630,
      totalSeconds: 630,
    },
  },
  {
    x: "10m",
    y: {
      type: "single",
      seconds: 600,
      totalSeconds: 600,
    },
  },
  {
    x: "10x30",
    y: {
      type: "repeated",
      secPerRepeat: 10,
      times: 30,
      totalSeconds: 300,
    },
  },
  {
    x: "10m30x30",
    y: {
      type: "repeated",
      secPerRepeat: 630,
      times: 30,
      totalSeconds: 630 * 30,
    },
  },
  {
    x: "10m30sx30",
    y: {
      type: "repeated",
      secPerRepeat: 630,
      times: 30,
      totalSeconds: 630 * 30,
    },
  },
  {
    x: "10mx30",
    y: {
      type: "repeated",
      secPerRepeat: 600,
      times: 30,
      totalSeconds: 600 * 30,
    },
  },
];

describe.each(data)("parser with $x", ({ x, y }) => {
  it(`should work with ${x}`, () => {
    const res = parseSingleSlug(x);
    expect(res).toEqual<ParserOutput>({
      type: "success",
      timer: y,
    });
  });
});
