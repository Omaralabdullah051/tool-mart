import { Box, Button, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../App";
import image from "../../assets/images/laptop.png";

export const AboutSection = () => {
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
    <Box sx={{ margin: "20px", backgroundColor, borderRadius: "10px" }}>
      <Grid container my={4} px={4} rowSpacing={2} columnSpacing={4}>
        <Grid item xs={12} sm={6}>
          <Box p={2} sx={{ display: { xs: "none", lg: "block" } }}>
            <img width="600px" src={image} alt="Breakfast" loading="lazy" />
          </Box>
          <Box p={2} sx={{ display: { xs: "block", sm: "none" } }}>
            <img width="200px" src={image} alt="Breakfast" loading="lazy" />
          </Box>
          <Box p={2} sx={{ display: { xs: "none", sm: "block", md: "none" } }}>
            <img width="300px" src={image} alt="Breakfast" loading="lazy" />
          </Box>
          <Box p={2} sx={{ display: { xs: "none", md: "block", lg: "none" } }}>
            <img width="400px" src={image} alt="Breakfast" loading="lazy" />
          </Box>
        </Grid>
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
              Best Choice
            </Typography>
            <Typography sx={{ fontWeight: 800, color }} variant="h4">
              Proper suggestion
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                marginTop: "10px",
                textAlign: "justify",
                color: color3,
              }}
              variant="body1"
            >
              Now we are all lived in a global world. Here technologies is the
              main part in our digitaliged world. But we are facing some problem
              when we introduced with that kind of technologies at first. We
              need to think and apply the current solution that might helps us
              in terms of technologies. Our guideline and support always with
              you. Here you will also found brand new technology tools and parts
              that is a core of a computer.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: color,
                "&:hover": {
                  backgroundColor: color2,
                },
              }}
            >
              About
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
