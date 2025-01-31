"use client";

import useOnMount from "@/snippets/useOnMount";
import { useEffect, useRef } from "react";
import { isAutoplayAllowed } from "./isAutoplayAllowed";

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

  onAutoplayErrorDetected?: () => void;
};

export type UseSoundPlayOptions = {
  stub: string;
};

// LATER: auto-play detection?
export default function useSound({
  source,
  volume = 0.75,
  onAutoplayErrorDetected,
}: UseSoundProps = {}): UseSoundReturn {
  const audioRef = useRef<HTMLAudioElement>(
    typeof Audio === "undefined" ? null : new Audio()
  );

  useEffect(() => {
    if (audioRef.current === null) return;
    audioRef.current.src = source ?? "";
  }, [source]);

  useEffect(() => {
    if (audioRef.current === null) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useOnMount(() => {
    (async () => {
      const ok = await isAutoplayAllowed();
      if (!ok) onAutoplayErrorDetected?.();
    })();
  }, [onAutoplayErrorDetected]);

  useEffect(() => {
    // react-hooks/exhaustive-deps
    const audio = audioRef.current;
    if (audio === null) return;

    return () => {
      audio.pause();
      audio.srcObject = null;
    };
  }, []);

  const play = () => {
    if (audioRef.current === null) return;

    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  const inturrupt = () => {
    audioRef.current?.pause();
  };

  return {
    play,
    inturrupt,
  };
}
