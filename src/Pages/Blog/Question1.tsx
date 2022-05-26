import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../App";

export const Question1 = () => {
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
          padding: { xs: "15px", md: "30px" },
          color,
          fontWeight: 800,
        }}
      >
        How will we improve the performance of a React Application?
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
        There are no limits to improve the performance of a React application.
        But In a major case, Some common things that might be able to improve
        the performance of a React application. We don't need to change the DOM
        too fast and also we don't need to manipulating the DOM directly. We
        need to use events and callbacks with limitations. Without the
        limitations of events and callbacks will create a performance issue. In
        class component, We can use React.PureComponent from React instead of
        React.Component. It returns the outcome of shallow props and state
        comparison. We need to Control Rerendering in React component. We can
        use useMemo hook that is so much important on performance related issue.
      </Typography>
    </Box>
  );
};
