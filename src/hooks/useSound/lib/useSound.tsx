"use client";

import { useEffect, useRef } from "react";

export type UseSoundReturn = {
  play: (opt?: UseSoundPlayOptions) => void;
  inturrupt: () => void;
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
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  useEffect(() => {
    if (audioRef.current === null) return;
    audioRef.current.src = source ?? "";
  }, [source]);

  useEffect(() => {
    if (audioRef.current === null) return;
    audioRef.current.volume = volume;
  }, [volume]);

  const play = () => {
    if (audioRef.current === null) return;

    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  const inturrupt = () => {
    audioRef.current.pause();
  };

  return {
    play,
    inturrupt,
  };
}
