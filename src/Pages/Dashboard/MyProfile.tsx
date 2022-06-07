import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../../App";
import auth from "../../firebase.init";

export const MyProfile = () => {
  const [user] = useAuthState(auth);
  const img: any = user?.photoURL;
  const value = useContext(Context);

  let theme;
  if (value?.checked) theme = "dark";
  else theme = "light";

  let backgroundColor: string;
  let color: string;
  let color2: string;
  let color3: string;
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
    <Box
      sx={{
        bgcolor: backgroundColor,
        // padding: "50px",
        // margin: "20px",
        padding: "20px",
        borderRadius: "5px",
      }}
    >
      <Stack direction="row" spacing={1}>
        <Avatar
          sx={{ width: 150, height: 150, margin: "10px auto" }}
          src={img}
        />
      </Stack>
      <Stack>
        <Typography
          mx="auto"
          sx={{ fontWeight: 800, fontSize: { xs: "15px", sm: "23px" } }}
          mt={1}
          variant="h6"
        >
          {user?.displayName}
        </Typography>
        <Typography
          mx="auto"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "10px", sm: "23px" },
            color: color2,
          }}
          mt={1}
          variant="h6"
        >
          {user?.email}
        </Typography>
      </Stack>
    </Box>
  );
};
