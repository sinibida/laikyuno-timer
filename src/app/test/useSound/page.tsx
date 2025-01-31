"use client";

import useSound from "@/hooks/useSound";
import { Box, Button } from "@mui/material";

export default function Page() {
  const { play } = useSound({
    source: "https://cdn.freesound.org/previews/787/787350_5674468-lq.mp3",
  });

  return (
    <Box>
      <Button onClick={() => play()}>Play Sound</Button>
    </Box>
  );
}
