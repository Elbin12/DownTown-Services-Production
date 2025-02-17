import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
import { api } from '../../axios';

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordStep, setIsPasswordStep] = useState(false);

    const handleContinue = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            setIsEmailValid(true);
            setIsPasswordStep(true);
        } else {
            toast.error('Please enter a valid email address')
        }
    }

    const handlePasswordContinue = async () => {
        if (password === confirmPassword) {
            try {
                const response = await api.post('worker/forgot-password/', {'email':email, 'password':password, 'confirmPassword':confirmPassword})

                if (response.status==200) {
                    toast.success('Password reset successfully');
                    navigate('/worker/login/');
                }
            } catch (error) {
                console.log(error, 'errrrrooorrr')
                if (error.response.data.error){
                  toast.error(error.response.data.error)
                }
            }
        } else {
            toast.error('Passwords do not match');
        }
    }

    return (
        <div className='w-full h-screen bg-lime-50 flex justify-center items-center'>
            <div className='bg-white w-1/4 py-9 px-12 flex flex-col gap-12 rounded-lg shadow-lg'>
                <p className='text-yellow-400 font-bold cursor-pointer hover:underline text-xs' onClick={() => { navigate('/worker/') }}>BACK</p>
                {!isPasswordStep ? (
                    <div className='text-center flex flex-col gap-5'>
                        <h1 className='font-semibold text-lg'>Forgot password</h1>
                        <input type="email" placeholder='Enter your Email' value={email} className='outline-none border w-full py-2 px-2 focus:border-gray-500 rounded-lg' onChange={(e) => setEmail(e.target.value)}/>
                        <div className='bg-[#3C5267] rounded-lg text-center py-2 cursor-pointer' onClick={handleContinue}>
                            <h2 className='text-white font-bold'>CONTINUE</h2>
                        </div>
                    </div>
                ) : (
                    <div className='text-center flex flex-col gap-5'>
                        <h1 className='font-semibold text-lg'>Enter New Password</h1>
                        <input type="password" placeholder='Enter your Password' value={password} className='outline-none border w-full py-2 px-2 focus:border-gray-500 rounded-lg' onChange={(e) => setPassword(e.target.value)}/>
                        <input type="password" placeholder='Confirm Password' value={confirmPassword} className='outline-none border w-full py-2 px-2 focus:border-gray-500 rounded-lg' onChange={(e) => setConfirmPassword(e.target.value)}/>
                        <div className='bg-[#3C5267] rounded-lg text-center py-2 cursor-pointer' onClick={handlePasswordContinue}>
                            <h2 className='text-white font-bold'>CONTINUE</h2>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ForgotPassword;
