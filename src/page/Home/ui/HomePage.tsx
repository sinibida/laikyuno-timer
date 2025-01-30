import { Container, Typography } from "@mui/material";
import TimerInput from "./TimerInput";

export default function HomePage() {
  return (
    <Container>
      <Typography variant="h2">
        개떡찰떡
        <br />
        타이머
      </Typography>
      <TimerInput />
    </Container>
  );
}
