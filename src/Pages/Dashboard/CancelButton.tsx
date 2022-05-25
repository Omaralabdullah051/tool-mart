import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useContext, useState } from "react";
import { Context } from "../../App";

const CancelButton = () => {
  const [open, setOpen] = useState(false);
  const value = useContext(Context);

  let theme;
  if (value?.checked) theme = "dark";
  else theme = "light";

  let backgroundColor: string;
  let color: string;
  let color2: string;
  let color3: string;
  if (theme === "dark") {
    backgroundColor = "#111827";
    color = "#e11d48";
    color2 = "#52525b";
    color3 = "#6b7280";
  } else {
    backgroundColor = "#d6d3d1";
    color = "#1e293b";
    color2 = "#334155";
    color3 = "#000";
  }
  return (
    <>
      <Button onClick={() => setOpen(true)}>Cencel</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle
          sx={{ bgcolor: backgroundColor, color: color2, fontWeight: 800 }}
          id="dialog-title"
        >
          Are you sure want to cancel this?
        </DialogTitle>
        <DialogContent sx={{ bgcolor: backgroundColor }}>
          <DialogContentText
            id="dialog-description"
            sx={{ color: color2, fontWeight: 700 }}
          >
            Once you cancel it, this item will be removed from here. I will not
            get it's information further.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ bgcolor: backgroundColor }}>
          <Button sx={{ color: "" }} onClick={() => setOpen(false)}>
            Yes,Cancel
          </Button>
          <Button color="error" onClick={() => setOpen(false)} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CancelButton;
