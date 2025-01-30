"use client";

import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ArrowForward } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function TimerInput() {
  const [path, setPath] = useState("");
  const [error, setError] = useState<string>();
  const router = useRouter();

  const onSubmit = () => {
    if (path.length === 0) {
      setError("타이머 정보를 입력하세요.");
      return;
    }

    const resolvedPath = (() => {
      let ret = path;
      if (ret.startsWith("/")) ret = ret.slice(1);
      return ret;
    })();
    router.push(`/t/${resolvedPath}`);
  };

  useEffect(() => {
    setError(undefined);
  }, [path]);

  return (
    <Box sx={{ alignItems: "center", display: "flex" }}>
      <TextField
        value={path}
        onChange={(e) => setPath(e.target.value)}
        label={"타이머 입력"}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        error={!!error}
        helperText={error}
      />
      <Button onClick={onSubmit} endIcon={<ArrowForward />}>
        Go!
      </Button>
    </Box>
  );
}
