"use client";

import { ReactNode, useEffect, useRef } from "react";

export type UseSoundReturn = {
  play: (opt?: UseSoundPlayOptions) => void;

  soundNode: ReactNode;
};

export type UseSoundProps = {
  source?: string;
  /**
   * @default 0.75
   */
  volume?: number;
};

export type UseSoundPlayOptions = {
  stub: string;
};

// LATER: auto-play detection?
export default function useSound({
  source,
  volume = 0.75,
}: UseSoundProps = {}): UseSoundReturn {
  const audioRef = useRef<HTMLAudioElement>(null);

  const soundNode = <audio ref={audioRef} src={source} />;

  useEffect(() => {
    if (audioRef.current === null) return;

    audioRef.current.volume = volume;
  }, [volume]);

  const play = () => {
    if (audioRef.current === null) return;

    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  return {
    play,
    soundNode,
  };
}
