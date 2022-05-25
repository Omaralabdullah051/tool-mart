import { Box, Grid, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../App";
import auth from "../../firebase.init";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();
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

  if (user) {
    navigate("/");
  }

  const onSubmit = async (data: any) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography
        sx={{ fontWeight: 700 }}
        variant="h4"
        textAlign="center"
        mt={12}
      >
        Login
      </Typography>
      <Stack direction="column" spacing={2} mx="auto" mt={2}>
        <Box mx="auto">
          <Stack mb={2}>
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
              <Typography
                textAlign="center"
                mb={1}
                variant="body2"
                color="error"
              >
                {errors.email?.message}
              </Typography>
            )}
            {errors.email?.type === "pattern" && (
              <Typography
                textAlign="center"
                mb={1}
                variant="body2"
                color="error"
              >
                {errors.email?.message}
              </Typography>
            )}
          </Stack>
          <Stack>
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
              })}
            ></input>
            {errors.password?.type === "required" && (
              <Typography
                textAlign="center"
                mb={1}
                variant="body2"
                color="error"
              >
                {errors.password?.message}
              </Typography>
            )}
          </Stack>
        </Box>
        <Typography variant="body1" textAlign="center">
          Don't have an account?
          <Link
            style={{ textDecoration: "none", marginLeft: "5px" }}
            to="/register"
          >
            Please Register
          </Link>
        </Typography>
      </Stack>
      <input
        style={{
          margin: "10px auto",
          display: "block",
          backgroundColor,
          padding: "12px 20px",
          borderRadius: "5px",
          color: color3,
          cursor: "pointer",
          border: "none",
        }}
        type="submit"
        value="Login"
      />
    </form>
  );
};
