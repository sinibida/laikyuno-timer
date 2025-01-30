"use client";

import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { ArrowForward } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function TimerInput() {
  const [path, setPath] = useState("");
  const router = useRouter();

  // STUB
  const onSubmit = () => {
    const resolvedPath = (() => {
      let ret = path;
      if (ret.startsWith("/")) ret = ret.slice(1);
      return ret;
    })();
    router.push(`/t/${resolvedPath}`);
  };

  return (
    <Box sx={{ alignItems: "center", display: "flex" }}>
      <TextField
        value={path}
        onChange={(e) => setPath(e.target.value)}
        label={"타이머 입력"}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
      />
      <Button onClick={onSubmit}>
        Go! <ArrowForward />
      </Button>
    </Box>
  );
}
