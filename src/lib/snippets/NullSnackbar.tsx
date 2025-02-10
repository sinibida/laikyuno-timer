import { Paper } from "@mui/material";
import { CustomContentProps } from "notistack";
import React from "react";

type NullSnackbarPtops = CustomContentProps;

const NullSnackbar = React.forwardRef<HTMLDivElement, NullSnackbarPtops>(
  (props, ref) => {
    const {
      // You have access to notistack props and options 👇🏼
      id,
      message,
    } = props;

    return (
      <Paper
        ref={ref}
        role="alert"
        key={id}
        elevation={4}
        sx={{ background: "none" }}
      >
        {message}
      </Paper>
    );
  }
);
NullSnackbar.displayName = "NullSnackbar";

export default NullSnackbar;
