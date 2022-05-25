import { Box, Grid, Stack, Typography } from "@mui/material";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../App";
import "./input.css";
import auth from "../../firebase.init";

export const Register = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onTouched",
  });
  watch("password", "");
  const [value, setValue] = useState("");
  const value1 = useContext(Context);

  let theme;
  if (value1?.checked) theme = "dark";
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

  if (user) {
    console.log(user);
    navigate("/");
  }

  const imgStorageKey = "babb3d19b4514339d479026905735a56";
  const onSubmit = async (data: any) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
    let img;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        img = result.data.url;
      });
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name, photoURL: img });
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack mt={12}>
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ fontWeight: 800 }}
          mb={3}
        >
          Register
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
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is Required",
                    },
                  })}
                ></input>
                {errors.name?.type === "required" && (
                  <Typography variant="body2" color="error">
                    {errors.name?.message}
                  </Typography>
                )}
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
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is Required",
                    },
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Provide a valid email",
                    },
                  })}
                ></input>
                {errors.email?.type === "required" && (
                  <Typography variant="body2" color="error">
                    {errors.email?.message}
                  </Typography>
                )}
                {errors.email?.type === "pattern" && (
                  <Typography variant="body2" color="error">
                    {errors.email?.message}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Stack>
        <Stack direction="row" spacing={2} mx="auto">
          <Grid
            container
            columnSpacing={2}
            rowSpacing={2}
            sx={{ textAlign: "center" }}
          >
            <Grid item xs={12} sm={6}>
              <input
                type="password"
                style={{
                  backgroundColor,
                  color: color3,
                  borderBottom: `2px solid ${color}`,
                }}
                placeholder="Password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is Required",
                  },
                  pattern: {
                    value: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/,
                    message:
                      "Must contain at least one digit,lowercase,special character, min 6 & max 20 characters",
                  },
                })}
              ></input>
              {errors.password?.type === "required" && (
                <Typography variant="body2" color="error">
                  {errors.password?.message}
                </Typography>
              )}
              {errors.password?.type === "pattern" && (
                <Typography
                  sx={{ fontSize: "10px" }}
                  variant="body2"
                  color="error"
                >
                  {errors.password?.message.slice(0, 50)}
                </Typography>
              )}
              {errors.password?.type === "pattern" && (
                <Typography
                  sx={{ fontSize: "10px" }}
                  variant="body2"
                  color="error"
                >
                  {errors.password?.message.slice(50, 100)}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                type="password"
                style={{
                  backgroundColor,
                  color: color3,
                  borderBottom: `2px solid ${color}`,
                }}
                placeholder="Confirm Password"
                {...register("confirm_password", {
                  required: {
                    value: true,
                    message: "Confrim Password is Required",
                  },
                  validate: (val: string) => {
                    if (watch("password") !== val) {
                      return "Your passwords do not match";
                    }
                  },
                })}
              ></input>
              {errors.confirm_password?.type === "required" && (
                <Typography variant="body2" color="error">
                  {errors.confirm_password?.message}
                </Typography>
              )}
              {errors.confirm_password?.type === "validate" && (
                <Typography variant="body2" color="error">
                  {errors.confirm_password?.message}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Stack>
        <input
          style={{ margin: "10px auto", fontWeight: 700 }}
          type="file"
          {...register("image", {
            required: {
              value: true,
              message: "image is Required",
            },
          })}
        />
        {errors.image?.type === "required" && (
          <Typography textAlign="center" variant="body2" color="error">
            {errors.image?.message}
          </Typography>
        )}
        <Typography variant="body1" textAlign="center">
          Already have an account?
          <Link
            style={{ textDecoration: "none", marginLeft: "5px" }}
            to="/login"
          >
            Please login
          </Link>
        </Typography>
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
          value="Register"
        />
      </Stack>
    </form>
  );
};
