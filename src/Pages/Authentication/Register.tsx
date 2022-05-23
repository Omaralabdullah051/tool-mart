import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../App";
import "./input.css";

export const Register = () => {
  const [value, setValue] = useState("");
  const value1 = useContext(Context);

  let theme;
  if (value1?.checked) theme = "dark";
  else theme = "light";

  let backgroundColor: string;
  let color: string;
  let color2: string;
  let color3: string;
  let color4: string;
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
    <Stack mt={12}>
      <Typography
        variant="h4"
        textAlign="center"
        sx={{ fontWeight: 800 }}
        mb={3}
      >
        Register
      </Typography>
      <Stack direction="row" spacing={2} mx="auto" mb={2}>
        <Grid
          container
          columnSpacing={2}
          rowSpacing={2}
          sx={{ textAlign: "center" }}
        >
          <Grid item xs={12} sm={6}>
            <Box>
              <input
                type="text"
                style={{
                  backgroundColor,
                  color: color3,
                  borderBottom: `2px solid ${color}`,
                }}
                placeholder="Your Name"
              ></input>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <input
                type="email"
                style={{
                  backgroundColor,
                  color: color3,
                  borderBottom: `2px solid ${color}`,
                }}
                placeholder="Your Email"
              ></input>
            </Box>
          </Grid>
        </Grid>
      </Stack>
      <Stack direction="row" spacing={2} mx="auto">
        <Grid
          container
          columnSpacing={2}
          rowSpacing={2}
          sx={{ textAlign: "center" }}
        >
          <Grid item xs={12} sm={6}>
            <input
              type="password"
              style={{
                backgroundColor,
                color: color3,
                borderBottom: `2px solid ${color}`,
              }}
              placeholder="Password"
            ></input>
          </Grid>
          <Grid item xs={12} sm={6}>
            <input
              type="password"
              style={{
                backgroundColor,
                color: color3,
                borderBottom: `2px solid ${color}`,
              }}
              placeholder="Confirm Password"
            ></input>
          </Grid>
        </Grid>
      </Stack>
      <Typography variant="body1" textAlign="center" mt={2}>
        Already have an account?
        <Link style={{ textDecoration: "none", marginLeft: "5px" }} to="/login">
          Please login
        </Link>
      </Typography>
      <input
        style={{
          margin: "10px auto",
          backgroundColor,
          padding: "12px 20px",
          borderRadius: "5px",
          color: color3,
          cursor: "pointer",
          border: "none",
        }}
        type="submit"
        value="Register"
      />
    </Stack>
  );
};
