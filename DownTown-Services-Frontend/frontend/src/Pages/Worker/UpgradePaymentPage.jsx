import React from 'react'
import Navbar from '../../Components/Worker/Navbar';
import { Elements } from '@stripe/react-stripe-js';
import CreditPayment from '../../Components/Worker/CreditPayment';
import { loadStripe } from "@stripe/stripe-js";

function UpgradePaymentPage() {
    const key = process.env.REACT_APP_STRIPE_PUBLISH_KEY
    const stripePromise = loadStripe(key);
  return (
    <>
        <Navbar />
        <Elements stripe={stripePromise}>
          <CreditPayment role={'upgrade'} stripePromise={stripePromise}/>
        </Elements>
    </>
  )
}

export default UpgradePaymentPage
