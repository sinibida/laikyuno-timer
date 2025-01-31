"use client"

import useSound from "@/hooks/useSound";
import { Box, Button } from "@mui/material";

export default function Page() {
  const { play, soundNode } = useSound();

  return (
    <Box>
      <Button onClick={() => play()}>Play Sound</Button>
      {soundNode}
    </Box>
  );
}
