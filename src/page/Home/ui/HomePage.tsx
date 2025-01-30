import { Container, Paper, Typography } from "@mui/material";
import TimerInput from "./TimerInput";
import PatternOverlay from "./PatternOverlay";

export default function HomePage() {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "primary.main",
      }}
    >
      <PatternOverlay />
      <Paper
        sx={{
          display: "flex",
          gap: 4,
          p: 6,
          flexDirection: "column",
          zIndex: 100,
        }}
        elevation={4}
      >
        <Typography variant="h2">
          개떡찰떡
          <br />
          타이머
        </Typography>
        <TimerInput />
      </Paper>
    </Container>
  );
}
