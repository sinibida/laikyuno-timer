import { Box } from "@mui/material";
import { patternOverlayUrl } from "../model/svg";

export default function BackgroundOverlay() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        backgroundColor: "primary.main",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${patternOverlayUrl})`,
          backgroundRepeat: "repeat",
          backgroundSize: "24px",
        }}
      />
    </Box>
  );
}
