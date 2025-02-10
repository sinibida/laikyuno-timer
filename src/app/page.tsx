import HomePage from "@/ui/pages/Home";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <HomePage />
    </Suspense>
  );
}
