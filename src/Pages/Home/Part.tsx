import { Box, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { Typography, CardActions, Button } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../App";
import { PartProps } from "../../Interfaces/Interfaces";
import { useNavigate } from "react-router-dom";

export const Part = ({ part }: PartProps<string>) => {
  const {
    name,
    img,
    description,
    minimumOrderQuantity,
    availableQuantity,
    price,
  } = part;

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
    color = "#7f1d1d";
    color2 = "#52525b";
    color3 = "#737373";
  } else {
    backgroundColor = "#d6d3d1";
    color = "#1e293b";
    color2 = "#334155";
    color3 = "#6b7280";
  }
  const navigate = useNavigate();

  const handleNavigate = (id: string) => {
    navigate(`/purchase/${id}`);
  };

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Box my={4} mx={4}>
        <Card
          sx={{
            bgcolor: backgroundColor,
            color: color2,
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={img}
            alt="unplash img"
          />
          <CardContent>
            <Typography
              sx={{ fontWeight: 800, fontSize: { xs: "18px", md: "25px" } }}
              gutterBottom
              variant="h5"
              component="div"
            >
              Name: {name}
            </Typography>
            <Typography
              sx={{ fontWeight: 800 }}
              variant="body1"
              color="text-secondary"
            >
              Minimum Order Quantity: {minimumOrderQuantity}
            </Typography>
            <Typography
              sx={{ fontWeight: 800 }}
              variant="body1"
              color="text-secondary"
            >
              Available Quantity: {availableQuantity}
            </Typography>
            <Typography
              sx={{ fontWeight: 800, fontSize: { xs: "18px", md: "25px" } }}
              variant="h6"
              color="text-secondary"
            >
              Price: {price}
            </Typography>
            <Typography
              sx={{ fontWeight: 800, fontSize: { xs: "10px", md: "15px" } }}
              variant="body2"
              color="text-secondary"
            >
              description: {description.slice(0, 180)}......
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => handleNavigate(part._id)} size="small">
              Place Order
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
};
