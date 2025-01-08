import React, { useEffect, useState } from 'react';
import { GoPlus } from "react-icons/go";
import add_money from '../../images/add_money.png';
import {api} from '../../axios'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutFrom from './CheckoutFrom';
import { useSelector } from 'react-redux';


function Wallet({role}) {
  const key = process.env.REACT_APP_STRIPE_PUBLISH_KEY
  const stripePromise = loadStripe(key);

  const [isClick, setIsClick] = useState(false);
  const [amount, setAmount] = useState();

  const [wallet, setWallet] = useState();

  useEffect(()=>{
    const fetchWallet = async()=>{
      const url = role === 'user' ? 'wallet/' : 'worker/wallet/'
      try{
        const res = await api.get(url)
        if (res.status === 200){
          setWallet(res.data)
          console.log(res.data, 'dataaa')
        }
      }catch(err){
        console.log(err, 'err')
      }
    }
    fetchWallet();
  }, [])

  const handlePaymentSuccess = async(paymentIntentId, transaction_id) => {
    console.log("Wallet updated!");
    setIsClick(false);
    try{
      const url = role === 'user'? 'capture_payment/' : 'worker/capture_payment/'
      const res = await api.post(url, {'payment_intent_id':paymentIntentId, 'transaction_id':transaction_id})
      console.log('success vvvvvv', res.data);
      if (res.status === 200){
        setWallet(res.data);
        console.log('success capture', res.data);
      }
    }catch(err){
      console.log(err, 'errr')
    }
  };

  return (
    <div className="pt-[10rem] flex flex-col items-center h-screen">
      <div className="px-11 bg-white w-3/5 py-6 flex flex-col gap-4 items-center rounded-lg" onClick={() => setIsClick(false)}>
        <div className="flex justify-between px-4 py-6 w-full bg-orange-100 rounded-lg">
          <h1 className="text-3xl text-[#c68815] font-bold">₹{wallet?.balance}</h1>
          <div className="bg-[#c68815] px-5 py-3 flex items-center gap-1 rounded-lg cursor-pointer" onClick={(e) => {e.stopPropagation();setIsClick(true);}}>
            <GoPlus className="text-xl text-white" />
            <h1 className="text-white text-xs font-semibold">Add Money to Wallet</h1>
          </div>
        </div>

        {isClick && (
          <div className="mt-20 px-4 z-20 py-3 right-1/4 w-1/5 fixed flex flex-col items-center bg-white rounded-lg shadow-lg border border-gray-200" onClick={(e) => e.stopPropagation()}>
            <img src={add_money} alt="" className="w-11 h-11" />
            <p className="text-sm font-semibold text-gray-600 mt-2">Add Money to your Wallet.</p>
            <div className="w-full flex flex-col gap-2">
              <input type="number" min={10} placeholder="Enter amount" className="mt-2 w-full px-3 py-3 text-xs border rounded focus:outline-none" onChange={(e) => setAmount(e.target.value)}/>
              <Elements stripe={stripePromise}>
                <CheckoutFrom role={role} amount={amount} onPaymentSuccess={handlePaymentSuccess} />
              </Elements>
            </div>
          </div>
        )}

        <div className="w-full flex-1 flex flex-col">
          <h1 className="mb-2 font-medium text-lg">All Transactions</h1>
          <div className="h-64 bg-white rounded-lg overflow-y-auto shadow-lg scrollbar-none">
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg">
                <thead className="bg-[#3d4f5ed2] text-white font-semibold sticky top-0 z-10">
                  <tr>
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Amount</th>
                    <th className="py-3 px-6 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800 text-sm">
                  {wallet?.transactions?.map((trans, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-6">{trans.transaction_type}</td>
                      <td className="py-3 px-6">{trans.amount}</td>
                      <td className="py-3 px-6">{trans.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wallet
