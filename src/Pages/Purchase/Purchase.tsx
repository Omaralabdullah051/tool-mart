import { Box, Grid, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../App";
import auth from "../../firebase.init";

export const Purchase = () => {
  const [user] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});
  const { id } = useParams();
  const value = useContext(Context);
  const { data, isLoading } = useQuery(["getParts", id], () =>
    fetch(`http://localhost:5000/getparts/${id}`).then((res) => res.json())
  );

  if (isLoading) {
    return <p>...loading</p>;
  }

  const {
    name,
    img,
    description,
    minimumOrderQuantity,
    availableQuantity,
    price,
  } = data.result[0];

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
  const userName: any = user?.displayName;
  const userEmail: any = user?.email;

  const onSubmit = (data: any) => {
    console.log(data);
    const orders = {
      name: userName,
      email: userEmail,
      address: data.address,
      phone: data.phone,
    };
    fetch("http://localhost:5000/order/post", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(orders),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          toast.success(data.message);
          reset();
        }
        if (data.error) {
          if (data.error.name) {
            toast.error(data.error.name);
          }
          if (data.error.email) {
            toast.error(data.error.email);
          }
          if (data.error.address) {
            toast.error(data.error.address);
          }
          if (data.error.phone) {
            toast.error(data.error.phone);
          }
        }
      });
  };

  return (
    <>
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
            <Box
              p={2}
              sx={{ display: { xs: "none", sm: "block", md: "none" } }}
            >
              <img width="300px" src={img} alt="Breakfast" loading="lazy" />
            </Box>
            <Box
              p={2}
              sx={{ display: { xs: "none", md: "block", lg: "none" } }}
            >
              <img width="400px" src={img} alt="Breakfast" loading="lazy" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box p={2}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: color2,
                  fontSize: { xs: "18px", md: "25px" },
                }}
              >
                {name}
              </Typography>
              <Typography sx={{ fontWeight: 800, color }} variant="h4">
                ${price}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: color2,
                  fontSize: { xs: "18px", md: "25px" },
                }}
              >
                Minimun: {minimumOrderQuantity} pieces
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: color2,
                  fontSize: { xs: "18px", md: "25px" },
                }}
              >
                Available: {availableQuantity} pieces
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  marginTop: "10px",
                  textAlign: "justify",
                  color: color3,
                }}
                variant="body2"
              >
                {description}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack mt={12}>
          <Typography
            variant="h4"
            textAlign="center"
            sx={{ fontWeight: 800 }}
            mb={3}
          >
            Place Order
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
            <Grid
              container
              columnSpacing={2}
              rowSpacing={2}
              sx={{ textAlign: "center" }}
            >
              <Grid item xs={12} sm={6}>
                <input
                  type="text"
                  style={{
                    backgroundColor,
                    color: color3,
                    borderBottom: `2px solid ${color}`,
                  }}
                  placeholder="Your Address"
                  {...register("address", {
                    required: {
                      value: true,
                      message: "Address is Required",
                    },
                  })}
                ></input>
                {errors.address?.type === "required" && (
                  <Typography variant="body2" color="error">
                    {errors.address?.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  type="text"
                  style={{
                    backgroundColor,
                    color: color3,
                    borderBottom: `2px solid ${color}`,
                  }}
                  placeholder="Your Phone"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Phone number is required",
                    },
                  })}
                ></input>
                {errors.phone?.type === "required" && (
                  <Typography variant="body2" color="error">
                    {errors.phone?.message}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Stack>
          <Box mx="auto" mt={2}>
            <input
              type="number"
              style={{
                backgroundColor,
                color: color3,
                borderBottom: `2px solid ${color}`,
              }}
              placeholder="Quantity"
              {...register("quantity", {
                required: {
                  value: true,
                  message: "Quantity is required",
                },
                validate: (val: string) => {
                  const value = parseFloat(val);
                  if (value < minimumOrderQuantity) {
                    return `You need to order minimun ${minimumOrderQuantity} pieces`;
                  }
                  if (value >= availableQuantity) {
                    return `You need to order maximum ${availableQuantity} pieces`;
                  }
                },
              })}
            ></input>
            {errors.quantity?.type === "required" && (
              <Typography textAlign="center" variant="body2" color="error">
                {errors.quantity?.message}
              </Typography>
            )}
            {errors.quantity?.type === "validate" && (
              <Typography
                sx={{ fontSize: "12px" }}
                textAlign="center"
                variant="body2"
                color="error"
              >
                {errors.quantity?.message}
              </Typography>
            )}
          </Box>
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
            value="Purchase"
          />
        </Stack>
      </form>
    </>
  );
};
