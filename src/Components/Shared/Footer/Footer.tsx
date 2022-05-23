import { Box, Button, Link, Typography } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";
import AdbIcon from "@mui/icons-material/Adb";
import { useContext } from "react";
import { Context } from "../../../App";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const Footer = () => {
  const year = new Date().getFullYear();
  const value = useContext(Context);

  let theme;
  if (value?.checked) theme = "dark";
  else theme = "light";

  let backgroundColor: string;
  let color: string;
  if (theme === "dark") {
    backgroundColor = "#111827";
    color = "#6b7280";
  } else {
    backgroundColor = "#d6d3d1";
    color = "#000";
  }
  return (
    <Box sx={{ bgcolor: backgroundColor, padding: "50px", marginTop: "20rem" }}>
      <Box
        mb={1}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <AdbIcon />
        <Typography variant="h6" textAlign="center">
          toolMart
        </Typography>
      </Box>
      <Typography textAlign="center" sx={{ color: color }}>
        Contact Info
      </Typography>
      <Box
        mt={1}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CallIcon />
        <Typography sx={{ color: color }}>+1 (396)-292-2391</Typography>
      </Box>
      <Box
        mt={1}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <EmailIcon />
        <Typography sx={{ color: color }}>
          Omaralabdullah051@gmail.com
        </Typography>
      </Box>
      <Box
        mt={1}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <LocationOnIcon />
        <Typography sx={{ color: color }}>455 7th Ave, NY 99937, BD</Typography>
      </Box>
      <Box sx={{ textAlign: "center", marginTop: "5px" }}>
        <Button>Info</Button>
        <Button>Learn More</Button>
        <Button>About</Button>
        <Button>Contact US</Button>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box>
          <Link href="https://www.instagram.com/ab_omar.7/   " target="blank">
            <img
              width="50px"
              src="https://i.postimg.cc/q7NnDHYn/instagram.png"
              alt=""
            />
          </Link>
        </Box>

        <Box>
          <Link
            href="https://www.facebook.com/profile.php?id=100048860175423"
            target="blank"
          >
            <img
              width="60px"
              src="https://i.postimg.cc/DwcyrDQ2/facebook.png"
              alt=""
            />
          </Link>
        </Box>
        <Box>
          <Link href="https://github.com/Omaralabdullah051" target="blank">
            <img
              width="35px"
              className="w-10 mr-1"
              src="https://i.postimg.cc/XJBbzD5B/github-2.png"
              alt=""
            />
          </Link>
        </Box>
      </Box>
      <Box
        my={2}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CopyrightIcon />
        <Typography sx={{ color: color }} variant="body2" textAlign="center">
          {year}. All Right Reserved
        </Typography>
      </Box>
    </Box>
  );
};
