import { Box, Typography } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

interface PriceProps {
  price: number;
  id: string;
}

export const Checkout = ({ price, id }: PriceProps) => {
  const stripe = useStripe();
  const [user] = useAuthState(auth);
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/order/create-payment-intent", {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [price]);
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
    setSuccess("");
    setProcessing(true);

    const userName: any = user?.displayName;
    const userEmail: any = user?.email;
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userName,
            email: userEmail,
          },
        },
      });

    const intentErrorMessage: any = intentError?.message;
    if (intentError) {
      setCardError(intentErrorMessage);
      setProcessing(false);
    } else {
      setCardError("");
      setTransactionId(paymentIntent.id);
      console.log(paymentIntent);
      setSuccess("Congrats! Your Payment is completed");

      const payment = {
        transactionId: paymentIntent.id,
      };
      fetch(`http://localhost:5000/order/putagain/${id}`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          setProcessing(false);
          console.log(data);
        });
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
          style={{
            backgroundColor: "green",
            cursor: "pointer",
            padding: "5px 10px",
            marginTop: "10px",
            borderRadius: "5px",
          }}
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        {cardError && (
          <Typography
            sx={{ fontWeight: 800 }}
            mt={3}
            variant="h6"
            color="error"
          >
            {cardError}
          </Typography>
        )}
        {success && (
          <>
            <Typography
              mt={3}
              variant="h6"
              sx={{ color: "green", fontWeight: 800 }}
            >
              {success}
            </Typography>
            <Typography
              mt={3}
              variant="body2"
              sx={{ color: "green", fontWeight: 800 }}
            >
              Your transaction Id:
              <Typography sx={{ color: "orange" }}>{transactionId}</Typography>
            </Typography>
          </>
        )}
      </form>
    </>
  );
};
