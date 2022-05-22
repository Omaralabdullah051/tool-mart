import { Typography } from "@mui/material";
import { TypoProps } from "../../../Interfaces/Interfaces";

export const NavTypography = ({ xs, md, flex }: TypoProps) => {
  return (
    <Typography
      variant="h6"
      noWrap
      component="a"
      href="#"
      sx={{
        mr: 2,
        display: { xs: `${xs}`, md: `${md}` },
        fontFamily: "monospace",
        flexDirection: "row",
        flexGrow: `${flex.flexGrow}`,
        fontWeight: 700,
        letterSpacing: ".3rem",
        color: "inherit",
        textDecoration: "none",
      }}
    >
      tooMart
    </Typography>
  );
};
