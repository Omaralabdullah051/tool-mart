import { Grid, Stack, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { PartTypes } from "../../Interfaces/Interfaces";
import { Part } from "./Part";

export const Parts = () => {
  const { data, isLoading } = useQuery("parts", () =>
    fetch("http://localhost:5000/parts").then((res) => res.json())
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
        sx={{ fontWeight: 800 }}
      >
        Tools & Parts
      </Typography>
      <Grid container px={1} columnSpacing={1}>
        {data.result.map((part: PartTypes<string>) => (
          <Part key={part._id} part={part} />
        ))}
      </Grid>
    </Stack>
  );
};
