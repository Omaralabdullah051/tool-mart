import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import StarIcon from "@mui/icons-material/Star";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { MyOrders } from "./MyOrders";
import { AddReview } from "./AddReview";
import { MyProfile } from "./MyProfile";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";
import { ManageAllOrders } from "./ManageAllOrders";
import { AddProduct } from "./AddProduct";
import { ManageProducts } from "./ManageProducts";
import { MakeAdmin } from "./MakeAdmin";

export const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user?.email);
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
            textColor="inherit"
            indicatorColor="secondary"
            centered
          >
            {!admin ? (
              <TabList>
                <Tab label="My Orders" value="1" icon={<AssignmentIcon />} />
                <Tab label="Add Review" value="2" icon={<StarIcon />} />
                <Tab label="My Profile" value="3" icon={<AccountBoxIcon />} />
              </TabList>
            ) : (
              ""
            )}

            {admin ? (
              <TabList>
                <Tab
                  label="Manage All Orders"
                  value="1"
                  icon={<AssignmentIcon />}
                />
                <Tab label="Add Product" value="2" icon={<StarIcon />} />
                <Tab label="Make Admin" value="3" icon={<AccountBoxIcon />} />
                <Tab
                  label="Manage products"
                  value="4"
                  icon={<AccountBoxIcon />}
                />
                <Tab label="My Profile" value="5" icon={<AccountBoxIcon />} />
              </TabList>
            ) : (
              ""
            )}
          </TabList>
        </Box>
        {!admin ? (
          <Box>
            <TabPanel value="1">
              <MyOrders />
            </TabPanel>
            <TabPanel value="2">
              <AddReview />
            </TabPanel>
            <TabPanel value="3">
              <MyProfile />
            </TabPanel>
          </Box>
        ) : (
          <Box>
            <TabPanel value="1">
              <ManageAllOrders />
            </TabPanel>
            <TabPanel value="2">
              <AddProduct />
            </TabPanel>
            <TabPanel value="3">
              <MakeAdmin />
            </TabPanel>
            <TabPanel value="4">
              <ManageProducts />
            </TabPanel>
            <TabPanel value="5">
              <MyProfile />
            </TabPanel>
          </Box>
        )}
      </TabContext>
    </Box>
  );
};
