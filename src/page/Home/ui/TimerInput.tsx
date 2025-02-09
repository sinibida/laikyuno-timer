"use client";

import { ArrowForward } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TimerInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [path, setPath] = useState(searchParams.get("input") ?? "");
  const [error, setError] = useState<string>();

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
    <Box
      sx={{
        alignItems: "flex-end",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <TextField
        value={path}
        onChange={(e) => setPath(e.target.value)}
        label={"타이머 입력"}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        error={!!error}
        helperText={error}
        autoFocus
      />
      <Button
        onClick={onSubmit}
        endIcon={<ArrowForward />}
        size="large"
        variant="outlined"
      >
        Go!
      </Button>
    </Box>
  );
}
