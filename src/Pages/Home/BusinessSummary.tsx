import { Box, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../App";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SourceIcon from "@mui/icons-material/Source";
import ManIcon from "@mui/icons-material/Man";
import LocationCitySharpIcon from "@mui/icons-material/LocationCitySharp";
import { BussinessParts } from "./BussinessParts";

export const BusinessSummary = () => {
  const value = useContext(Context);

  let theme;
  if (value?.checked) theme = "dark";
  else theme = "light";

  let color: string;
  if (theme === "dark") {
    color = "#52525b";
  } else {
    color = "#334155";
  }
  return (
    <Box mt={15} mb={15} sx={{ margin: { xs: "0 12px", sm: "0 30px" } }}>
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: { xs: "22px", md: "40px" },
          color: color,
        }}
        variant="h4"
        textAlign="center"
      >
        Work Flow And Business
      </Typography>
      <Typography
        sx={{ fontWeight: 800, fontSize: { xs: "22px", md: "40px" } }}
        variant="h4"
        textAlign="center"
      >
        A TrustFul Organization
      </Typography>
      <Box>
        <Grid container mt={8} columnSpacing={6} rowSpacing={2}>
          <Grid item xs={12} sm={6} lg={3}>
            <BussinessParts text1="450+" text2="Content">
              <SourceIcon sx={{ fontSize: "100px" }} />
            </BussinessParts>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <BussinessParts text1="100+" text2="Documentation">
              <AssignmentIcon sx={{ fontSize: "100px" }} />
            </BussinessParts>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <BussinessParts text1="330+" text2="Client">
              <ManIcon sx={{ fontSize: "100px" }} />
            </BussinessParts>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <BussinessParts text1="273+" text2="City">
              <LocationCitySharpIcon sx={{ fontSize: "100px" }} />
            </BussinessParts>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
