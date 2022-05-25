import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import StarIcon from "@mui/icons-material/Star";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export const Dashboard = () => {
  const [value, setValue] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ margin: "20px" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            aria-label="Tabs example"
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            centered
          >
            <Tab label="My Orders" value="1" icon={<AssignmentIcon />} />
            <Tab label="Add Review" value="2" icon={<StarIcon />} />
            <Tab label="My Profile" value="3" icon={<AccountBoxIcon />} />
          </TabList>
        </Box>
        <TabPanel value="1">My Orders</TabPanel>
        <TabPanel value="2">Add Review</TabPanel>
        <TabPanel value="3">My Profile</TabPanel>
      </TabContext>
    </Box>
  );
};
