import { Box, Button } from "@mui/material";

export default function ButtonTest() {
  return (
    <Box>
      <Button variant="contained" color="primary">
        Primary Contained
      </Button>
      <Button variant="outlined" color="primary">
        Primary Outlined
      </Button>
      <Button variant="text" color="primary">
        Primary Text
      </Button>
      <Button variant="contained" color="secondary">
        Secondary Contained
      </Button>
      <Button variant="outlined" color="secondary">
        Secondary Outlined
      </Button>
      <Button variant="text" color="secondary">
        Secondary Text
      </Button>
    </Box>
  );
}
