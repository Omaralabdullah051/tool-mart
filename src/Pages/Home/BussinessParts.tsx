import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ReactElement, useContext } from "react";
import { Context } from "../../App";

interface PartsProps {
  text1: string;
  text2: string;
  children: ReactElement<any, any>;
}

export const BussinessParts = ({ text1, text2, children }: PartsProps) => {
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: backgroundColor,
        padding: "20px",
        borderRadius: "20px",
      }}
    >
      <Box>{children}</Box>
      <Box>
        <Typography
          sx={{ fontWeight: 800, color: color2 }}
          variant="h4"
          textAlign="center"
        >
          {text1}
        </Typography>
        <Typography
          sx={{ fontWeight: 800, color: color2 }}
          variant="body1"
          textAlign="center"
        >
          {text2}
        </Typography>
      </Box>
    </Box>
  );
};
