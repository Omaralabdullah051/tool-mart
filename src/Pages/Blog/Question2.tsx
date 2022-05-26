import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../App";

export const Question2 = () => {
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
        What are the different ways to manage a state in a React application?
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
        React is all about many beautiful patterns. In React, State Management
        is the most important things in React framework. We need to state manage
        in of our every application that are made by using React. But the most
        important things is to manage the state properly. There are many ways to
        handle and manage states. useState hook is one of them. It is the
        simpliest version ever in React application. We can share our states by
        using Higher order component, Render props pattern, Lifting State up,
        Context API ,exc. useContext hook is used to manage the state when we
        sharing our states by using Context API. That is the most useful and
        neccessary hook to manage state perfectly. When we have multiple states,
        we need to use useReducer hook. That contains all the bussiness logic in
        a signle reducer function. The most popular third-party library is used
        to manage state is Redux. By using Redux, We can make container or
        storage and manage states by using action and reducer function.
      </Typography>
    </Box>
  );
};
