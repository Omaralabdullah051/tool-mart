import { Box, Grid, Stack, Typography } from "@mui/material";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../App";
import "./input.css";
import auth from "../../firebase.init";
import { toast } from "react-toastify";
import { useToken } from "../../hooks/useToken";
import { LocationState } from "../../Interfaces/Interfaces";

export const Register = () => {
  const [createUserWithEmailAndPassword, user, loading, hookError] =
    useCreateUserWithEmailAndPassword(auth);
  const [error, setError] = useState("");
  const [token] = useToken(user);
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

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (hookError) {
      switch (hookError?.code) {
        case "auth/invalid-email":
          toast.error("Invalid email provided, please provide a valid email");
          setError("Invalid email provided, please provide a valid email");
          break;

        case "auth/email-already-in-use":
          toast.error("This email is already in used");
          setError("This email is already in used");
          break;

        case "auth/email-already-exists":
          toast.error("Email already exists");
          setError("Email already exists");
          break;

        case "auth/invalid-credential":
          toast.error(
            "Doesn't allow creation of multiple account with the same email"
          );
          setError(
            "Doesn't allow creation of multiple account with the same email"
          );
          break;

        default:
          toast.error(hookError?.message);
          setError(hookError?.message);
      }
    }
  }, [hookError]);

  const onSubmit = async (data: any) => {
    console.log(data);
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name, photoURL: data.image });
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
        <Box mx="auto" mt={2}>
          <textarea
            style={{
              backgroundColor,
              color: color3,
              height: "40px",
              borderBottom: `2px solid ${color}`,
            }}
            placeholder="Your Image URL"
            {...register("image", {
              required: {
                value: true,
                message: "Image is Required",
              },
            })}
          ></textarea>
        </Box>
        {errors.image?.type === "required" && (
          <Typography textAlign="center" variant="body2" color="error">
            {errors.image?.message}
          </Typography>
        )}
        <Typography mt={2} variant="body1" textAlign="center">
          Already have an account?
          <Link
            style={{ textDecoration: "none", marginLeft: "5px" }}
            to="/login"
          >
            Please login
          </Link>
        </Typography>
        {error ? (
          <Typography mt={2} textAlign="center" variant="body2" color="error">
            {error}
          </Typography>
        ) : (
          ""
        )}
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
