import { Stack, Rating } from "@mui/material";
import React, { useState } from "react";

export const Ratings = () => {
  const [value, setValue] = useState<number | null>(null);
  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: number | null
  ) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={2} mx="auto" mt={1}>
      <Rating
        sx={{ bgcolor: "#1e293b", padding: "5px", borderRadius: "5px" }}
        value={value}
        onChange={handleChange}
        precision={0.5}
        size="large"
      />
    </Stack>
  );
};
