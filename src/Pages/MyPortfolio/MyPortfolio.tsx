import { Avatar, Box, Stack, Typography, Link } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../App";
import img from "../../../src/assets/images/my-blog.png";

export const MyPortfolio = () => {
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
        bgcolor: backgroundColor,
        padding: "50px",
        margin: "20px",
        borderRadius: "5px",
      }}
    >
      <Stack direction="row" spacing={1}>
        <Avatar
          sx={{ width: 250, height: 250, margin: "10px auto" }}
          src={img}
        />
      </Stack>
      <Stack>
        <Typography
          mx="auto"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "15px", sm: "23px" },
            color: color,
          }}
          mt={1}
          variant="h6"
        >
          Omar Al Abdullah
        </Typography>
        <Typography
          mx="auto"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "15px", sm: "23px" },
            color: color2,
          }}
          mt={1}
          variant="h6"
        >
          omaralabdullah051@gmail.com
        </Typography>
        <Typography
          mx="auto"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "15px", sm: "23px" },
            color: color2,
          }}
          mt={1}
          variant="h6"
        >
          Educational Background: Intermediate
        </Typography>
        <Typography
          mx="auto"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "10px", sm: "20px" },
            color: color2,
          }}
          mt={1}
          variant="h6"
        >
          Skilled at: MongoDB, Express.js, React.js, node.js,etc.
        </Typography>
        <Typography
          mx="auto"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "13px", sm: "20px" },
            color: color,
          }}
          mt={1}
          variant="h6"
        >
          Explore My Projects:
        </Typography>
        <Box mx="auto">
          <Link
            sx={{ textDecoration: "none" }}
            mx="auto"
            href="https://book-mart-94d39.web.app/"
            target="blank"
          >
            BookMart
          </Link>
        </Box>
        <Box mx="auto">
          <Link
            sx={{ textDecoration: "none" }}
            mx="auto"
            href="https://independent-service-prov-44bc0.web.app/"
            target="blank"
          >
            ServiceUP
          </Link>
        </Box>
        <Box mx="auto">
          <Link
            sx={{ textDecoration: "none" }}
            mx="auto"
            href="https://laptop-analysis-website.netlify.app/"
            target="blank"
          >
            Analysis
          </Link>
        </Box>
      </Stack>
    </Box>
  );
};
