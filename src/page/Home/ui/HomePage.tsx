import { Box, Container, Paper, Typography } from "@mui/material";
import BackgroundOverlay from "./BackgroundOverlay";
import TimerInput from "./TimerInput";
import FooterOverlay from "./FooterOverlay";

export default function HomePage() {
  return (
    <Box
      sx={{
        height: "100vh",
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
        <BackgroundOverlay />
        <FooterOverlay />
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
