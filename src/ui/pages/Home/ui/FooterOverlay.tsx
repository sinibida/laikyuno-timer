import Dot from "@/ui/components/Dot";
import Link from "@/ui/components/Link";
import useVersion from "@/lib/hooks/useVersion";
import { GitHub, Person } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export default function FooterOverlay() {
  const version = useVersion();

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "column",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 0.5,
          color: "text.secondary",
          alignItems: "center",
        }}
      >
        <Typography variant="caption">{version}</Typography>

        <Dot variant="small" />

        <Link
          href="https://github.com/sinibida/laikyuno-timer"
          sx={{ color: "inherit" }}
          variant="caption"
          target="_blank"
        >
          <GitHub fontSize="inherit" />
          Repository
        </Link>

        <Link
          href="https://velog.io/@sinibida"
          sx={{ color: "inherit" }}
          variant="caption"
          target="_blank"
        >
          {/* LATER: Figure out how to align there */}
          <Person fontSize="inherit" sx={{ display: "inline-block" }} />
          SPAUPA
        </Link>
      </Box>
    </Box>
  );
}
