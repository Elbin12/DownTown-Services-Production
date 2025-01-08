import React, { useEffect, useRef, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { api } from '../../../axios';
import UserDetails from './UserDetails';
import { CiSquarePlus } from "react-icons/ci";
import { FaReceipt } from "react-icons/fa6";
import { IoIosRemoveCircle } from "react-icons/io";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from 'sonner';
import paymentImg from '../../../images/payment.png'
import { IoIosStar } from "react-icons/io";
import ServiceAcceptedPopup from '../../User/ServiceAcceptedPopup';
import WorkerOTPEntry from './WorkerOTPEntry';
import PaymentMethodPopup from '../../User/PaymentMethodPopup';



function AcceptedService({role}) {

    const key = process.env.REACT_APP_STRIPE_PUBLISH_KEY
    const stripePromise = loadStripe(key);

    const { id } = useParams();
    const [inputSections, setInputSections] = useState([]);
    const [accepted_service, setAcceptedService] = useState();
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0);
    const [review, setReview] = useState('');
    const [err, setErr] = useState();

    const [paymentDetails, setPaymentDetails] = useState(null);
    const [searchParams] = useSearchParams();

    const [error, setError] = useState(null);
    const [paymentAddError, setPaymentAddErr] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const receiptInput = useRef();

    useEffect(()=>{
        const fetchAcceptedService = async()=>{
            try{
                let url = ''
                if(role === 'user'){
                    url = `order/${id}/`
                }else if(role ==='worker'){
                    url = `worker/accepted-service/${id}/`
                }
                const res = await api.get(url)
                if (res.status === 200){
                    console.log('data', res.data)
                    setAcceptedService(res.data);
                }
            }catch(err){
                console.log('err', err)
            }
        }
        fetchAcceptedService();
    }, [])

    const imageClick =(e)=>{
        // receiptInput.current.click()
        e.target.previousElementSibling.lastElementChild.click()
    }

    
    const handleAddSection = ()=>{
        setInputSections([...inputSections, {description: '', image:'', amount:'', img:''}])
    }

    const handleInputChange = (index, field, value) => {
        console.log("index from handleInputChange-->", index)
        setPaymentAddErr('')
        const updatedSections = [...inputSections];
        console.log(updatedSections, index, 'kkkkk');
        updatedSections[index][field] = value;
        setInputSections(updatedSections);
      };
      
    const uploadImageDisplay = (event, index) => {
        console.log("index--", index);
        console.log("event.target.id--",event.target.id)
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            handleInputChange(index, "image", file);
            handleInputChange(index, "img", imageURL);
        }
    };
    
    console.log(inputSections, 'input');
    

    const workCompleted =async()=>{
        try{
            const res = await api.post('worker/work-completed/', {'order_id':accepted_service.id})
            if(res.status === 200){
                console.log(res.data, 'dataa')
                setAcceptedService(res.data);
            }
        }catch(err){
            console.log(err, 'err')
        }
    }

    const paymentProceed =async()=>{
        console.log(inputSections, 'ffff');
        let hasError = false;
        inputSections.forEach((section, index) => {
            if (!section.description || section.description.trim() ==='' || !section.image || !section.amount || !section.img) {
                console.error(`Validation Error: Section ${index + 1} has empty fields.`);
                hasError = true;
            }
        });

        if (hasError) {
            setPaymentAddErr('Please fill out all fields in each section before proceeding.');
            return
        }

        const formData = new FormData();

        formData.append('order_id', accepted_service?.id);

        formData.append('additional_charges', JSON.stringify(inputSections));

        inputSections.forEach((section, index) => {
            if (section.image) {
                formData.append(`image_${index}`, section.image);
                formData.append(`img_${index}`, section.img);
            }
        });
        setIsLoading(true);
        try{
            const res = await api.post('worker/add-payment/', formData)
            if(res.status === 200){
                setAcceptedService(res.data);
            }
            console.log('response --->', res.data, res )
        }catch(err){
            console.log(err, 'err');
        }finally{
            setIsLoading(false);
          }
    }

    const handleRating = (rate) => {
        setRating(rate);
      };

    const handleReviewSubmit = async()=>{
        if (review.trim() === ''){
            setErr('Please add a feedback')
            return
        }else if(!rating){
            setErr('Please give a rating')
            return
        }
        const data = {
            'review' : review,
            'order_id' : accepted_service?.id,
            'rating' : rating
        }

        try{
            const response = await api.post('add-review/', data)
            if (response.status === 200){
                setAcceptedService(response.data)
            }
        }catch(err){
            console.log(err, 'err')
        }
    }

    console.log(accepted_service, 'accepted_service')
  return (
    <div className=' w-full flex justify-center'>
        {role === 'user' && accepted_service?.status === 'pending' && <ServiceAcceptedPopup service={accepted_service} from={'order'}/>}
        <div className='bg-white w-full mx-24 py-9 my-9 mt-28 gap-9 flex flex-col rounded-lg h-full'>
            <UserDetails role={role} user={role==='user'?accepted_service?.worker:accepted_service?.user} order={accepted_service}/>
            {role==='worker' && accepted_service?.status === 'pending' &&
                <WorkerOTPEntry order={accepted_service} setAcceptedService={setAcceptedService}/>
            }
            {role==='worker' && accepted_service?.status === 'working' &&
                <div className='flex flex-col items-center gap-3'>
                    <h1 className='text-lg font-semibold text-neutral-700'>Click the button once you've finished your work.</h1>
                    <button className='bg-amber-600 text-white px-4 py-1 rounded-sm font-semibold' onClick={workCompleted}>Mark as Completed</button>
                    <div className='border-b  w-1/2'></div>
                </div>
            }
            {accepted_service?.status === 'completed' &&
                <div className='flex flex-col items-center gap-3 mx-40 border-stone-200'>
                    <h1 className='text-lg font-semibold text-neutral-700'>{role==='user'&& accepted_service?.worker?.first_name + ' is completed the service. You can check it out.'}</h1>
                    <div className='border-b  w-3/4'></div> 
                    {accepted_service?.payment_details?.status === 'paid' && 
                    <div className='flex gap-2 items-center'>
                        <img src={paymentImg} alt="" className='w-11 h-11'/>
                        <p className='text-lg font-semibold text-green-600'>Payment Successful</p>
                    </div>}
                </div>
            }
            {accepted_service?.payment_details &&
                <div className='flex flex-col items-center px-9 gap-7'>
                    <h1 className='text-lg text-lime-900 opacity-70 font-bold'>{role==='user'? accepted_service?.payment_details?.status === 'unPaid'? 'Please complete the payment':'':accepted_service?.payment_details?.status === 'unPaid'&&'Ensure the user has completed the payment'} </h1>
                    <div className='w-full h-auto flex gap-4 items-center'>
                        <img src={accepted_service?.service_image} alt="" className='h-36 w-auto object-cover'/>
                        <div className='flex w-3/4 flex-col gap-2'>
                            <div>
                                <h1 className='text-zinc-700'>{accepted_service?.service_name}</h1>
                                <p className='text-xs text-neutral-400 font-semibold'>{accepted_service?.order_tracking.arrival_time} - {accepted_service?.order_tracking.work_end_time}</p>
                            </div>
                            <h1 className='text-xs'>{accepted_service?.user_description}</h1>
                            <div className='flex-col w-4/5 flex gap-1'>
                                <div className='flex justify-between mb-2'>
                                    <h1 className='font-semibold text-slate-600'>Base Amount</h1>
                                    <div>
                                        <h1 className='font-bold text-neutral-800'>Rs. {accepted_service?.service_price}</h1>
                                    </div>
                                </div>
                                {accepted_service?.payment_details.additional_charges.map((charge)=>(
                                    <div className='flex justify-between mb-2'>
                                        <h1 className='font-semibold text-slate-600'>{charge.description}</h1>
                                        <div className='flex gap-2 items-center'>
                                            <img src={charge.reciept_img} className='w-9 h-9' alt="" />
                                            <h1 className='font-bold text-neutral-800'>Rs. {charge.price}</h1>
                                        </div>
                                    </div>
                                ))}
                                <div className='flex py-1 justify-between mb-2 border-t-2 text-lg border-stone-300 mt-3 pt-2'>
                                    <h1 className='font-semibold text-slate-900'>Total Amount</h1>
                                    <div>
                                        <h1 className='font-bold text-neutral-800'>Rs. {accepted_service?.payment_details?.total_amount }</h1>
                                    </div>
                                </div>
                                {/* {role==='user' && accepted_service?.payment_details?.status === 'unPaid' && <button className='bg-amber-500 py-1 rounded-lg text-white font-bold mt-4' onClick={handleSubmit}>Make payment</button>} */}
                                {role === 'user' && accepted_service?.payment_details?.status === 'unPaid' && (
                                    <PaymentMethodPopup setIsLoading={setIsLoading} id={id} stripePromise={stripePromise} setError={setError} />
                                )}
                            </div>
                        </div>
                        {role === 'user' && accepted_service?.status === 'completed' && accepted_service?.payment_details?.status === 'paid'&& accepted_service?.user_review.length === 0 &&
                            <div className='h-full w-1/2 flex flex-col gap-3 justify-center items-center'>
                                <div className='text-center gap-1'>
                                    <h1 className='text-lg'>How was the work?</h1>
                                    <p className='text-yellow-300 font-semibold text-lg'>Rate Us</p>
                                    <div className='flex text-4xl justify-center gap-1 text-gray-300'>
                                        {Array.from({ length: 5 }).map((_, index) => {
                                            const starIndex = index + 1;
                                            return(
                                                <IoIosStar
                                                key={index}
                                                className={
                                                    starIndex <= (hoveredRating || rating)
                                                    ? "text-yellow-300 cursor-pointer"
                                                    : "text-gray-300 cursor-pointer"
                                                }
                                                onClick={() => handleRating(starIndex)}
                                                onMouseEnter={() => setHoveredRating(starIndex)}
                                                onMouseLeave={() => setHoveredRating(0)}
                                                />
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className='flex flex-col gap-1 w-full items-center'>
                                    <p className='text-sm'>Give feedback about service and worker.</p>
                                    <div className='flex w-full items-center justify-center gap-2'>
                                        <div className='flex flex-col w-2/3'>
                                            <input type="text" className='py-1 w-full border border-stone-400 outline-none px-2 rounded-sm' onChange={(e)=>{setReview(e.target.value); setErr('')}}/>
                                            <p className='text-red-500 text-xs'>{err}</p>
                                        </div>
                                        <button className='border px-3 py-1 rounded bg-amber-300 text-white font-semibold text-sm shadow' onClick={handleReviewSubmit}>Add feedback</button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
            {role==='worker' && accepted_service?.status === 'completed' && !accepted_service?.payment_details &&
                <div className='flex flex-col items-center px-9 gap-7'>
                    <h1 className='text-lg text-lime-900 opacity-70 font-bold'>Please add the charges for the service</h1>
                    <div className='w-full h-auto flex gap-4'>
                        <img src={accepted_service?.service_image} alt="" className='h-36 w-auto object-cover'/>
                        <div className='flex w-full flex-col gap-2'>
                            <div>
                                <h1 className='text-zinc-700'>{accepted_service?.service_name}</h1>
                                <p className='text-xs text-neutral-400 font-semibold'>{accepted_service?.order_tracking.arrival_time} - {accepted_service?.order_tracking.work_end_time}</p>
                            </div>
                            <h1 className='text-xs'>{accepted_service?.user_description}</h1>
                            <div className='flex-col w-3/4 flex gap-1'>
                                <div className='flex justify-between mb-2'>
                                    <h1 className='font-semibold text-slate-600'>Base Amount</h1>
                                    <div>
                                        <h1 className='font-bold text-neutral-800'>Rs. {accepted_service?.service_price}</h1>
                                    </div>
                                </div>
                                <div className='flex w-full justify-between items-center'>
                                    <h1 className='text-sm'>Add if you have any Replacement charges</h1>
                                    <button className='border border-gray-300 px-4 flex items-center gap-1 text-sm text-white bg-slate-700 hover:shadow-lg font-semibold py-1 transform hover:scale-105 transition-all duration-200 ease-in-out rounded' onClick={handleAddSection}><CiSquarePlus className='text-lg'/> Add</button>
                                </div>
                                {inputSections.map((section, index) => (
                                    <div key={index} className='flex justify-between'>
                                        <div className=''><input value={section.description} onChange={(e)=>{handleInputChange(index, "description", e.target.value)}} className='border px-2' type="text" placeholder='what is this charge for'/></div>
                                        <div className='flex gap-1 items-center'>
                                            <h1 className='font-bold text-neutral-800'>Rs.</h1>
                                            <div>
                                                <input type="number" value={section.amount} onChange={(e) => handleInputChange(index, "amount", e.target.value)} className='w-16 px-2 py-1 text-sm border border-slate-700 rounded shadow bg-slate-700 text-white font-bold outline-none'/>
                                                <input type="file" ref={receiptInput} id='xxx' onChange={(e) => uploadImageDisplay(e, index)} className='hidden px-2 py-1 text-xs border border-slate-700 rounded shadow bg-slate-700 text-white font-bold outline-none'/>
                                            </div>
                                            <button onClick={(e)=> imageClick(e)} className='border border-gray-300 px-4 flex items-center gap-1 text-sm text-white bg-slate-700 font-semibold py-1 rounded transform hover:scale-105 transition-all duration-200 ease-in-out'><FaReceipt className='text-yellow-400'/>Add receipt</button>
                                            {section.image&&<img src={section.img} className='w-11 h-7 cursor-pointer object-cover' alt="" />}
                                            <IoIosRemoveCircle className='text-lg text-red-600 cursor-pointer' 
                                                onClick={() => {
                                                    const updatedSections = inputSections.filter((_, i) => i !== index);
                                                    setInputSections(updatedSections);
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <p className='text-xs text-red-500'>{paymentAddError}</p>
                                <div className={`bg-amber-500 py-1 rounded-lg text-white font-bold mt-4 flex items-center justify-center gap-3 cursor-pointer ${isLoading ? 'cursor-not-allowed opacity-75' : ''}`} onClick={paymentProceed} disabled={isLoading}>
                                    <h1>Proceed</h1>
                                    {isLoading && (
                                        <div className="w-4 h-4 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            
        </div>
    </div>
  )
}

export default AcceptedService
