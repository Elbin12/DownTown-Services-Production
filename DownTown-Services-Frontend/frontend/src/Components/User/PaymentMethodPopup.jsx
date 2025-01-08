import { useState } from 'react'
import { CreditCard, Wallet, Banknote, X } from 'lucide-react'
import { api } from '../../axios'

const paymentMethods = [
  { id: 'stripe', name: 'Online Payment (Stripe)', icon: <CreditCard className="w-6 h-6" /> },
  { id: 'wallet', name: 'Wallet', icon: <Wallet className="w-6 h-6" /> },
  { id: 'cash', name: 'Cash', icon: <Banknote className="w-6 h-6" /> },
]

export default function PaymentMethodPopup({setIsLoading, id, stripePromise, setError}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState(null)

  const handlePaymentMethodSelect = async() => {
    console.log(`Selected payment method: ${selectedMethod.id}`)
    if (selectedMethod.id === 'stripe'){
        console.log('jiii')
        setIsLoading(true);

        try {
            const response = await api.post('create_payment/', {'order_id':id})

            const { clientSecret } = await response.data

            console.log(clientSecret, 'secretttt', response.data)

            const stripe = await stripePromise;
            const { error, success } = await stripe.redirectToCheckout({sessionId:response.data.id});
            
        } catch (err) {
            setError("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    }
  }

  return (
    <div>
      <button
        className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-1 rounded-lg transition duration-300 ease-in-out w-full"
        onClick={() => setIsOpen(true)}
      >
        Make Payment
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Choose Payment Method</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  className={`w-full flex items-center justify-start gap-3 p-4 text-left ${
                    selectedMethod?.id === method.id ? 'bg-amber-50' : 'bg-white'
                  } border rounded-lg transition-all duration-200 hover:bg-amber-50`}
                  onClick={()=>{setSelectedMethod(method)}}
                >
                  <div className="bg-amber-500 text-white p-2 rounded-full">
                    {method.icon}
                  </div>
                  <span className="font-semibold text-gray-600">{method.name}</span>
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className={`bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out ${
                  !selectedMethod ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => {
                  if (selectedMethod) {
                    console.log(`Continuing with payment method: ${selectedMethod}`);
                    handlePaymentMethodSelect()
                    setIsOpen(false);
                  }
                }}
                disabled={!selectedMethod}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

