import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react'
import { api } from '../../axios';
import { useSelector } from 'react-redux';

function CheckoutFrom({role, amount, onPaymentSuccess }) {

    const user = useSelector(state=>state.user.userinfo)

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
        console.error("Stripe has not loaded properly.");
        return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
          const url = role === 'user'? "add-money/" : "worker/add-money/"
          const res = await api.post(url, { amount });
          const { client_secret } = res.data;
          const {transaction_id} = res.data;

          const paymentResult = await stripe.confirmCardPayment(client_secret, {
              payment_method: {
              card: cardElement,
              billing_details: {
                  name: user?.first_name,
              },
              },
          });

          if (paymentResult.error) {
              console.error("Payment failed:", paymentResult.error.message);
          } else if (paymentResult.paymentIntent.status === "succeeded") {
              const paymentIntentId = paymentResult.paymentIntent.id;
              console.log("Payment successful!");
              onPaymentSuccess(paymentIntentId, transaction_id);
          }
        } catch (error) {
        console.error("Error during payment:", error);
        }
    };
    
  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "12px",
              color: "#424770",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#9e2146" },
          },
        }}
        className="w-full px-3 py-3 border rounded mb-4"
      />
      <button type="submit" disabled={!stripe} className="px-4 py-1.5 w-full bg-[#c68815] text-white font-semibold text-sm rounded">
        ₹{amount}
      </button>
    </form>
  )
}

export default CheckoutFrom
