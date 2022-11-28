import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  const myComponentStyle = {
    position: "absolute",
    top: 10,
    lineHeight: 5,
  };
  return (
    <Dialog style={myComponentStyle} open={openPopup}>
      <DialogTitle sx={{ paddingRight: "0px" }}>
        <div style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button
            color="secondary"
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            X
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
