import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { api } from '../../axios';

function PaymentSuccess() {

    const [paymentDetails, setPaymentDetails] = useState(null);
    const [searchParams] = useSearchParams(); // React Router's hook to access query params

    useEffect(() => {
        const fetchPaymentDetails = async () => {
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
            toast.error('No session ID found in URL')
            return;
        }

        try {
            const response = await api.get(`payment-success/`, {
            params: { session_id: sessionId },
            });
            setPaymentDetails(response.data);
        } catch (err) {
            console.log('err', err)
        }
        };

        fetchPaymentDetails();
    }, [searchParams]);
    
    return (
        <div>
            
        </div>
    )
    }

export default PaymentSuccess
