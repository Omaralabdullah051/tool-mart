import { Avatar, Box, Grid, Rating, Typography } from "@mui/material";
import { useContext } from "react";
import { useQuery } from "react-query";
import { Context } from "../../App";
import { OrderTypes } from "../../Interfaces/Interfaces";

export const Review = () => {
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
  const { data: reviews, isLoading } = useQuery("getReviews", () =>
    fetch(`https://limitless-beach-64664.herokuapp.com/review/get`).then(
      (res) => res.json()
    )
  );

  if (isLoading) {
    return <p>...loading</p>;
  }
  return (
    <Box mx={2}>
      <Typography
        sx={{
          color,
          fontWeight: 800,
          fontSize: { xs: "28px", lg: "45px" },
        }}
        mt={12}
        mb={8}
        textAlign="center"
        variant="h3"
      >
        Reviews
      </Typography>
      <Grid container columnSpacing={1}>
        {reviews.result.map((review: OrderTypes<string>) => (
          <Grid
            key={review._id}
            mx="auto"
            sx={{
              backgroundColor,
              borderRadius: "10px",
            }}
            item
            xs={12}
            md={4}
          >
            <Box sx={{ textAlign: "center" }}>
              <Avatar
                sx={{ width: 105, height: 105, margin: "5px auto" }}
                src={review.img}
              />
              <Typography
                sx={{
                  color,
                  fontWeight: 800,
                  fontSize: { xs: "13px", sm: "20px" },
                }}
                variant="h6"
              >
                {review.name}
              </Typography>
              <Typography
                sx={{
                  color: color2,
                  fontWeight: 800,
                  fontSize: { xs: "13px", sm: "20px" },
                }}
                variant="body1"
              >
                {review.email}
              </Typography>
              <Typography
                sx={{ color: color2, fontWeight: 800 }}
                variant="body2"
              >
                {review.comment}
              </Typography>
              <Rating value={review.rating} precision={0.5} size="large" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
