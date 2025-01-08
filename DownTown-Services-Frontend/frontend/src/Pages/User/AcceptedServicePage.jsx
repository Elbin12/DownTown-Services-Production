import React from 'react'
import Navbar from '../../Components/User/Navbar/Navbar'
import AcceptedService from '../../Components/Worker/AcceptedService/AcceptedService'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import Footer from '../../Components/User/Footer';

function AcceptedServicePage() {
  const key = process.env.REACT_APP_STRIPE_PUBLISH_KEY
  const stripePromise = loadStripe(key);
  return (
    <>
        <Elements stripe={stripePromise}>
          <AcceptedService role={'user'} stripePromise={stripePromise}/>
        </Elements>
    </>
  )
}

export default AcceptedServicePage
