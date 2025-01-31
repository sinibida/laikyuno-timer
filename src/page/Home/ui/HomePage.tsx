import { Box, Container, Paper, Typography } from "@mui/material";
import TimerInput from "./TimerInput";
import PatternOverlay from "./PatternOverlay";

export default function HomePage() {
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "primary.main",
      }}
    >
      <Container
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
            <Typography color="primary" variant="inherit" component="span">
              게
            </Typography>
            떡찰떡
            <br />
            타이머
          </Typography>
          <TimerInput />
        </Paper>
      </Container>
    </Box>
  );
}
