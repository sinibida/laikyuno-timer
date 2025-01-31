"use client";

import { ReactNode, useRef } from "react";

export type UseSoundReturn = {
  play: (opt?: UseSoundPlayOptions) => void;

  soundNode: ReactNode;
};

export type UseSoundProps = {
  source?: string;
};

export type UseSoundPlayOptions = {
  stub: string;
};

export default function useSound({}: UseSoundProps = {}): UseSoundReturn {
  const audioRef = useRef<HTMLAudioElement>(null);

  const soundNode = <audio ref={audioRef} controls />;

  // STUB
  const play = () => {
    audioRef.current?.play();
  };

  return {
    play,
    soundNode,
  };
}
