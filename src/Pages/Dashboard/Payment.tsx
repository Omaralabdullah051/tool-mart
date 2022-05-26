import { Box, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useContext } from "react";
import { Context } from "../../App";
import { PaymentBox } from "./PaymentBox";

export const Payment = () => {
  const { id } = useParams();
  const value = useContext(Context);

  const { data, isLoading } = useQuery(["getOrders", id], () =>
    fetch(`http://localhost:5000/order/getorders/${id}`).then((res) =>
      res.json()
    )
  );

  if (isLoading) {
    return <p>...loading</p>;
  }

  const { _id, name, img, price, quantity, toolName } = data.result[0];

  const totalPrice = price * quantity;

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
    <Box sx={{ margin: "20px", backgroundColor, borderRadius: "10px" }}>
      <Grid container my={4} px={4} rowSpacing={2} columnSpacing={4}>
        <Grid item xs={12} sm={6}>
          <Box p={2} sx={{ display: { xs: "none", lg: "block" } }}>
            <img
              width="600px"
              height="500px"
              src={img}
              alt="Breakfast"
              loading="lazy"
            />
          </Box>
          <Box p={2} sx={{ display: { xs: "block", sm: "none" } }}>
            <img width="200px" src={img} alt="Breakfast" loading="lazy" />
          </Box>
          <Box p={2} sx={{ display: { xs: "none", sm: "block", md: "none" } }}>
            <img width="300px" src={img} alt="Breakfast" loading="lazy" />
          </Box>
          <Box p={2} sx={{ display: { xs: "none", md: "block", lg: "none" } }}>
            <img width="400px" src={img} alt="Breakfast" loading="lazy" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box p={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: color2,
                fontSize: { xs: "18px", md: "23px" },
              }}
            >
              Hello, {name}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 800,
                color: color2,
                fontSize: { xs: "18px", md: "23px" },
              }}
            >
              Your ordered tool is {toolName}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 800,
                color: color2,
                fontSize: { xs: "18px", md: "23px" },
              }}
            >
              Quantity: {quantity}
            </Typography>
            <Typography sx={{ fontWeight: 800, color }} variant="h5">
              please pay ${price * quantity}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 800,
                color: color2,
                fontSize: { xs: "18px", md: "23px" },
              }}
            >
              Contact Us: omaralabdullah051@gmail.com
            </Typography>
            <PaymentBox price={totalPrice} id={_id} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
