import { Stack } from "@mui/material";
import { Banner } from "./Banner";
import { BusinessSummary } from "./BusinessSummary";
import { Parts } from "./Parts";

export const Home = () => {
  return (
    <Stack>
      <Banner />
      <Parts />
      <BusinessSummary />
    </Stack>
  );
};
