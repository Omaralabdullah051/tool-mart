import { Grid, Stack, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { PartTypes } from "../../Interfaces/Interfaces";
import { Part } from "./Part";

export const Parts = () => {
  const { data, isLoading } = useQuery("parts", () =>
    fetch("https://limitless-beach-64664.herokuapp.com/parts").then((res) =>
      res.json()
    )
  );

  if (isLoading) {
    return <p>...loading</p>;
  }

  return (
    <Stack>
      <Typography
        variant="h3"
        textAlign="center"
        mt={8}
        sx={{ fontWeight: 800, fontSize: { xs: "28px", md: "40px" } }}
      >
        Tools & Parts
      </Typography>
      <Grid container px={1} columnSpacing={1} mb={15}>
        {data.result.map((part: PartTypes<string>) => (
          <Part key={part._id} part={part} />
        ))}
      </Grid>
    </Stack>
  );
};
