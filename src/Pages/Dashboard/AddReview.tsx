import { Box, Grid, Rating, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Context } from "../../App";
import auth from "../../firebase.init";

export const AddReview = () => {
  const [user] = useAuthState(auth);
  const userName: any = user?.displayName;
  const userEmail: any = user?.email;
  const img: any = user?.photoURL;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const value1 = useContext(Context);

  let theme;
  if (value1?.checked) theme = "dark";
  else theme = "light";
  const [value, setValue] = useState<number | null>(null);
  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: number | null
  ) => {
    setValue(newValue);
  };

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
  const onSubmit = (data: any) => {
    const review = {
      name: userName,
      email: userEmail,
      comment: data.comment,
      img: img,
      rating: value,
    };
    fetch("https://limitless-beach-64664.herokuapp.com/review/post", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          toast.success(data.message);
          reset();
        }
        if (data.error?.rating) toast.error(data.error?.rating);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack mt={5}>
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ fontWeight: 800 }}
          mb={3}
        >
          Add Review
        </Typography>
        <Stack direction="row" spacing={2} mx="auto" mb={2}>
          <Grid
            container
            columnSpacing={2}
            rowSpacing={2}
            sx={{ textAlign: "center" }}
          >
            <Grid item xs={12} sm={6}>
              <Box>
                <input
                  type="text"
                  style={{
                    backgroundColor,
                    color: color3,
                    borderBottom: `2px solid ${color}`,
                  }}
                  placeholder="Your Name"
                  defaultValue={userName}
                  readOnly
                ></input>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <input
                  type="email"
                  style={{
                    backgroundColor,
                    color: color3,
                    borderBottom: `2px solid ${color}`,
                  }}
                  placeholder="Your Email"
                  defaultValue={userEmail}
                  readOnly
                ></input>
              </Box>
            </Grid>
          </Grid>
        </Stack>
        <Stack direction="row" spacing={2} mx="auto">
          <Box>
            <textarea
              style={{
                backgroundColor,
                color: color3,
                borderBottom: `2px solid ${color}`,
              }}
              placeholder="Add Comment"
              {...register("comment", {
                required: {
                  value: true,
                  message: "Comment is Required",
                },
              })}
            ></textarea>
            {errors.comment?.type === "required" && (
              <Typography textAlign="center" variant="body2" color="error">
                {errors.comment?.message}
              </Typography>
            )}
          </Box>
        </Stack>
        <Stack spacing={2} mx="auto" mt={1}>
          <Rating
            sx={{
              bgcolor: backgroundColor,
              padding: "5px",
              borderRadius: "5px",
            }}
            value={value}
            onChange={handleChange}
            precision={0.5}
            size="large"
          />
        </Stack>
        <input
          style={{
            margin: "10px auto",
            backgroundColor,
            padding: "12px 20px",
            borderRadius: "5px",
            color: color3,
            cursor: "pointer",
            border: "none",
          }}
          type="submit"
          value="ADD"
        />
      </Stack>
    </form>
  );
};
