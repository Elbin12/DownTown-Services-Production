import React from 'react'
import Navbar from '../../Components/Worker/Navbar'
import CreditPayment from '../../Components/Worker/CreditPayment'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";

function CreditPaymentPage() {
    const key = process.env.REACT_APP_STRIPE_PUBLISH_KEY
    const stripePromise = loadStripe(key);
  return (
    <>
        <Navbar />
        <Elements stripe={stripePromise}>
          <CreditPayment stripePromise={stripePromise}/>
        </Elements>
    </>
  )
}

export default CreditPaymentPage
