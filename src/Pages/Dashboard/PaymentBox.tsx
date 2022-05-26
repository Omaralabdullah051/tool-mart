import { Box } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Checkout } from "./Checkout";

interface PriceProps {
  price: number;
  id: string;
}

export const PaymentBox = ({ price, id }: PriceProps) => {
  const stripePromise = loadStripe(
    "pk_test_51L0kmMFBnaKJyYKf2o6YJFHI31OWEinFLj1hqZ0NyaiZa8sHfIs5997wCcLTRZeOB1dlfizP49GrsOdK4MrmCitJ00EujHnG0K"
  );
  return (
    <Box mt={4}>
      <Elements stripe={stripePromise}>
        <Checkout price={price} id={id} />
      </Elements>
    </Box>
  );
};
