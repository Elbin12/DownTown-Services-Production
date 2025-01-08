import React, { useState } from 'react'
import { Key, ArrowRight, CheckCircle, XCircle } from 'lucide-react'
import { api } from '../../../axios'

function WorkerOTPEntry({order, setAcceptedService}) {
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [err, setErr] = useState()

    const handleChange = (index, value, event) => {
        setErr();
        if (event.key === 'Backspace' && !value && index > 0) {
            const previousInput = document.getElementById(`otp-${index - 1}`);
            previousInput?.focus();
        } else if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
    
            if (value && index < 5) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        const otpString = otp.join('')
        if (otpString.length === 6) {
        try {
            const res = await api.post('/worker/check-otp/', {'order_id':order?.id, 'otp':otpString})
            console.log(res.data, 'dataaa')
            if (res.status === 200){
                setAcceptedService(res.data);
            }
        } catch (error) {
            console.log(error, 'errr')
            setErr(error.response.data.error)
        }
        }

        setIsSubmitting(false)
    }

  return (
    <div className="py-4 px-8 flex justify-center">
      <div className="flex flex-col items-center">
        <div className="bg-blue-100 p-3 rounded-full mb-4">
          <Key className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Enter OTP</h2>
        <p className="text-gray-600 text-center mb-6">Please enter the 6-digit code provided by the customer</p>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex justify-between mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value, e)}
                onKeyDown={(e) => handleChange(index, digit, e)}
                className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg"
              />
            ))}
          </div>
          <button
            type="submit"
            disabled={isSubmitting || otp.join('').length !== 6}
            className={`w-full py-3 px-4 rounded-lg text-white font-semibold text-lg transition-all duration-300 flex items-center justify-center ${
              isSubmitting || otp.join('').length !== 6
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#44768aeb] hover:bg-[#376070]'
            }`}
          >
            {isSubmitting ? (
              'Verifying...'
            ) : (
              <>
                Verify OTP
                <ArrowRight className="h-5 w-5 ml-2" />
              </>
            )}
          </button>
          <h1 className='text-red-500 text-xs'>{err}</h1>
        </form>
      </div>
    </div>
  )
}

export default WorkerOTPEntry
