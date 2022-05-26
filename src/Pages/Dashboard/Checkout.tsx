import { Box, Typography } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

interface PriceProps {
  price: number;
}

export const Checkout = ({ price }: PriceProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      const errorCard: any = error.message;
      setCardError(errorCard);
    } else {
      setCardError("");
    }
  };

  return (
    <>
      <form
        style={{
          backgroundColor: "#fff",
          padding: "50px",
          borderRadius: "10px",
        }}
        onSubmit={handleSubmit}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          style={{ backgroundColor: "green" }}
          type="submit"
          disabled={!stripe}
        >
          Pay
        </button>
        {cardError && (
          <Typography mt={3} variant="h6" color="error">
            {cardError}
          </Typography>
        )}
      </form>
    </>
  );
};
