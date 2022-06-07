import { Box, Button, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../App";
import image from "../../assets/images/banner.png";

export const Banner = () => {
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
        margin: { xs: "12px", sm: "20px" },
        backgroundColor,
        borderRadius: "10px",
      }}
    >
      <Grid container my={4} px={2} rowSpacing={2} columnSpacing={4}>
        <Grid item xs={12} sm={6}>
          <Box p={2}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: color2,
                fontSize: { xs: "18px", md: "25px" },
              }}
            >
              Perfect Management
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "18px", md: "25px" },
                fontWeight: 800,
                color,
              }}
              variant="h4"
            >
              All that You need
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "10px", md: "13px", lg: "18px" },
                fontWeight: 700,
                marginTop: "10px",
                textAlign: "justify",
                color: color3,
              }}
              variant="body1"
            >
              It is place where you will found almost all the core tools and
              parts of a traditional computer. We manages this tools and things
              in an efficient way. You can easily order an item with card
              payment system. You will find all types of parts that a standard
              computer has or need. You will be able to order these tools and
              parts in a cheaper rate and get all the related supports and
              guideliness about this technologies.You will also get a better
              understanding auto these tools which is not only the parts of the
              computer but also a regular phemomenon of our lifes.
            </Typography>
            <Button
              variant="contained"
              size="small"
              sx={{
                marginTop: "5px",
                fontSize: { xs: "10px", md: "13px" },
                backgroundColor: color,
                "&:hover": {
                  backgroundColor: color2,
                },
              }}
            >
              Info
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box p={2} sx={{ display: { xs: "none", lg: "block" } }}>
            <img width="600px" src={image} alt="Breakfast" loading="lazy" />
          </Box>
          <Box
            p={2}
            sx={{ display: { xs: "block", sm: "none", margin: "0 auto" } }}
          >
            <img
              style={{ margin: "0 auto", display: "block" }}
              width="200px"
              src={image}
              alt="Breakfast"
              loading="lazy"
            />
          </Box>
          <Box p={2} sx={{ display: { xs: "none", sm: "block", md: "none" } }}>
            <img width="300px" src={image} alt="Breakfast" loading="lazy" />
          </Box>
          <Box p={2} sx={{ display: { xs: "none", md: "block", lg: "none" } }}>
            <img width="400px" src={image} alt="Breakfast" loading="lazy" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
