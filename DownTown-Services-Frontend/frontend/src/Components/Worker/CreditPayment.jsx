import React, { useState } from "react";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements} from "@stripe/react-stripe-js";
import { api } from "../../axios"; // Your axios instance for API calls
import { CiCreditCard2 } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setWorkerinfo } from "../../redux/worker";


function CreditPayment({role}) {

  const dispatch = useDispatch()

  const location = useLocation();
  const { selectedPlan } = location.state || {};

  console.log(selectedPlan, 'selected plan')

  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage("Stripe.js has not loaded yet.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");

      if(role === 'upgrade'){
        const response = await api.post('/worker/subscription/upgrade/', {
            subscription_plan_id: selectedPlan.id,
          });
    
          if (response.status === 200) {
            alert("Payment and subscription setup successful!");
            if(response.data.worker_info){
              dispatch(setWorkerinfo(response.data.worker_info))
            }
          } else {
            throw new Error(response.data.error || "Subscription setup failed");
          }
      }else{
        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: event.target.nameOnCard.value,
          },
        });
  
        if (paymentMethodError) {
          throw new Error(paymentMethodError.message);
        }
  
        const { data } = await api.post("/worker/subscription/create/", {
          subscription_plan_id: selectedPlan.id,
          payment_method_id: paymentMethod.id,
        });
  
        if (data.status === "success") {
          alert("Payment and subscription setup successful!");
          if(data.worker_info){
            dispatch(setWorkerinfo(data.worker_info))
          }
        }
      }


      // // 2. Create the payment intent
      // const { data } = await api.post("/worker/payment/create-intent/", {
      //   amount: selectedPlan.price,
      //   currency: "inr",
      //   payment_method_id: paymentMethod.id, // Pass the payment method ID
      // });

      // const { clientSecret, customer } = data;

      // // 3. Confirm the payment
      // const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      //   clientSecret,
      //   {
      //     payment_method: paymentMethod.id,
      //   }
      // );

      // if (confirmError) {
      //   throw new Error(confirmError.message);
      // }

      // 4. Handle subscription setup
      // const response = await api.post(url, {
      //   payment_intent_id: paymentIntent.id,
      //   subscription_plan_id: selectedPlan.id,
      //   payment_method_id: paymentMethod.id, // Pass the payment method ID
      // });

      // if (response.status === 200) {
      //   alert("Payment and subscription setup successful!");
      // } else {
      //   throw new Error(response.data.error || "Subscription setup failed");
      // }

    } catch (error) {
      console.error("Payment error:", error);
      setErrorMessage(error.message || "Failed to process payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex justify-center items-center pt-32 bg-white">
      <form onSubmit={handlePayment} className="payment-form  w-full max-w-lg p-6 rounded-lg ">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Set up your debit card
        </h2>
        <div className="mb-4">
          <div className="flex items-center border border-gray-300 w-full px-3 py-3 rounded-lg">
            <CardNumberElement
              options={{
                placeholder:'Card Number',
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                    "::placeholder": { color: "#aab7c4" },
                    iconColor: "#c4f0ff",
                  },
                  invalid: {
                    color: "#e3342f",
                    iconColor: "#e3342f",
                  },
                },
              }}
              className="stripe-input w-full"
            />
            <CiCreditCard2 className="text-3xl opacity-40"/>
          </div>
        </div>
        <div className="mb-4 flex gap-3">
          <div className="w-1/2">
            <CardExpiryElement
              options={{
                placeholder:'Expiration date',
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                    "::placeholder": { color: "#aab7c4" },
                  },
                  invalid: {
                    color: "#e3342f",
                  },
                },
              }}
              className="stripe-input border border-gray-300 w-full px-3 py-4 rounded-lg"
            />
          </div>
          <div className="w-1/2">
            <div className="relative">
              <CardCvcElement
                options={{
                  placeholder:'CVV',
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                      "::placeholder": { color: "#aab7c4" },
                    },
                    invalid: {
                      color: "#e3342f",
                    },
                  },
                }}
                className="stripe-input border border-gray-300 w-full px-3 py-4 rounded-lg"
              />
              <i className="fas fa-lock absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="nameOnCard"
            placeholder="Name on card"
            className="w-full border border-gray-300 px-3 py-4 rounded-lg outline-none bg-transparent"
          />
        </div>
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
        )}
        <button
          type="submit"
          className="bg-[#467894] text-white py-3 px-6 rounded-lg w-full font-semibold hover:bg-[#3e6c86] disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : `Pay ₹${selectedPlan.price}`}
        </button>
      </form>
    </div>
  );
}

export default CreditPayment;
