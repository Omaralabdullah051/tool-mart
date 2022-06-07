import { Stack } from "@mui/material";
import { AboutSection } from "./AboutSection";
import { Banner } from "./Banner";
import { BusinessSummary } from "./BusinessSummary";
import { Parts } from "./Parts";
import { Review } from "./Review";
import { TimeLine } from "./TimeLine";

export const Home = () => {
  return (
    <Stack>
      <Banner />
      <Parts />
      <BusinessSummary />
      {/* <Review /> */}
      <TimeLine />
      <AboutSection />
    </Stack>
  );
};
