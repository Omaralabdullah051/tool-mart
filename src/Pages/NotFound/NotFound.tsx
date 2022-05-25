import { Stack, Typography, Button } from "@mui/material";
import img from "../../assets/images/404.png";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <Stack sx={{ padding: "20px" }}>
      <img width="350px" style={{ margin: "5px auto" }} src={img} alt="" />
      <Stack>
        <Typography textAlign="center" sx={{ fontWeight: 800 }} variant="body1">
          The page you are looking for is not available right row
        </Typography>
      </Stack>
      <Button
        variant="outlined"
        sx={{ width: "150px", margin: "10px auto" }}
        onClick={handleNavigate}
      >
        Go Back Home
      </Button>
    </Stack>
  );
};
