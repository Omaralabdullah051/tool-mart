import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../App";

export const Question3 = () => {
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
    <Box mt={3}>
      <Typography
        textAlign="center"
        sx={{
          fontSize: { xs: "15px", md: "23px" },
          color,
          fontWeight: 800,
          padding: { xs: "15px", md: "30px" },
        }}
      >
        Why you do not set the state directly in React?
      </Typography>
      <Typography
        mt={2}
        textAlign="center"
        sx={{
          fontSize: { xs: "8px", md: "18px" },
          color: color2,
          fontWeight: 800,
          padding: { xs: "15px", md: "30px" },
          textAlign: "justify   ",
        }}
      >
        React is library that crates a virtual DOM under the hood. It manages
        all things by changing states. When we directly change our states, React
        doesn't understand that the state is change and need to repaint on the
        web browser. Because It creates a copy in virtual Dom and keeps track by
        state updater function. This is a bad idea. Mutating state directly can
        lead to odd bugs, and components that are hard to optimize. If the props
        look the same, it skips the render, and saves some time.even if you
        immediately call setState. Optimized components might not re-render if
        you do, and the rendering bugs will be tricky to track down.
      </Typography>
    </Box>
  );
};
