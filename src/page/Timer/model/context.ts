import { UseTimerReturn } from "@/hooks/useTimer/lib/useTimer";
import { createContext } from "react";

export interface ContextType {
  timer: UseTimerReturn;
}

export const Context = createContext<ContextType>(undefined!);
