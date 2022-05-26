import { Box, Grid, Rating, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../App";
import auth from "../../firebase.init";

export const AddProduct = () => {
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
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    const product = {
      name: data.name,
      img: data.img,
      description: data.description,
      minimumOrderQuantity: data.minimumOrderQuantity,
      availableQuantity: data.availableQuantity,
      price: data.price,
    };
    fetch("http://localhost:5000/postpart", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          toast.success(data.message);
          navigate("/");
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
          Add Product
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
                  placeholder="Product Name"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Product Name is Required",
                    },
                  })}
                ></input>
                {errors.name?.type === "required" && (
                  <Typography textAlign="center" variant="body2" color="error">
                    {errors.name?.message}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <input
                  type="Number"
                  style={{
                    backgroundColor,
                    color: color3,
                    borderBottom: `2px solid ${color}`,
                  }}
                  placeholder="Product Price"
                  {...register("price", {
                    required: {
                      value: true,
                      message: "Product Price is Required",
                    },
                  })}
                ></input>
                {errors.price?.type === "required" && (
                  <Typography textAlign="center" variant="body2" color="error">
                    {errors.price?.message}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Stack>
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
                  type="Number"
                  style={{
                    backgroundColor,
                    color: color3,
                    borderBottom: `2px solid ${color}`,
                  }}
                  placeholder="Minimum Order Quantity"
                  {...register("minimumOrderQuantity", {
                    required: {
                      value: true,
                      message: "Minimum Order Quantity is Required",
                    },
                  })}
                ></input>
                {errors.minimumOrderQuantity?.type === "required" && (
                  <Typography textAlign="center" variant="body2" color="error">
                    {errors.minimumOrderQuantity?.message}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <input
                  type="Number"
                  style={{
                    backgroundColor,
                    color: color3,
                    borderBottom: `2px solid ${color}`,
                  }}
                  placeholder="Available Quantity"
                  {...register("availableQuantity", {
                    required: {
                      value: true,
                      message: "Available Quantity is Required",
                    },
                  })}
                ></input>
                {errors.availableQuantity?.type === "required" && (
                  <Typography textAlign="center" variant="body2" color="error">
                    {errors.availableQuantity?.message}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Stack>
        <Stack direction="column" spacing={2} mx="auto">
          <Box>
            <textarea
              style={{
                backgroundColor,
                color: color3,
                borderBottom: `2px solid ${color}`,
              }}
              placeholder="Add Description"
              {...register("description", {
                required: {
                  value: true,
                  message: "Description is Required",
                },
              })}
            ></textarea>
            {errors.description?.type === "required" && (
              <Typography textAlign="center" variant="body2" color="error">
                {errors.description?.message}
              </Typography>
            )}
          </Box>
          <Box>
            <textarea
              style={{
                backgroundColor,
                color: color3,
                height: "50px",
                borderBottom: `2px solid ${color}`,
              }}
              placeholder="Product Image URL"
              {...register("img", {
                required: {
                  value: true,
                  message: "Img URL is Required",
                },
              })}
            ></textarea>
            {errors.img?.type === "required" && (
              <Typography textAlign="center" variant="body2" color="error">
                {errors.img?.message}
              </Typography>
            )}
          </Box>
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
