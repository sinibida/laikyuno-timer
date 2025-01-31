import { Parser } from "@/domains/Parser";
import TimerPage from "@/page/Timer";

type Params = {
  timerParams: string[];
};

export default async function Page({ params }: { params: Promise<Params> }) {
  const { timerParams } = await params;
  const parser = new Parser();
  const out = parser.parse({ slugs: timerParams });
  if (out.type !== "success") {
    throw new Error("Unimplemented");
  }
  return <TimerPage timerSettings={out.timer} />;
}
