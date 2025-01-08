import React, { useState } from 'react';
import img from '../../images/worker_signup.png';
import { useNavigate } from 'react-router-dom';
import SentRequest from '../../Components/Worker/SentRequest';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { api } from '../../axios';
import { useLoadScript } from "@react-google-maps/api";

function SignUp() {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [err, setErr] = useState();
  const [categories, setCategories] = useState();


  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    mob: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
      .required('Mobile number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm passowrd is required'),
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_LOCATION_API,
    libraries: ["places"],
  });

  return (
    <div>
      {popup && <SentRequest isLoaded={isLoaded} setPopup={setPopup} categories={categories} setFormValues={setFormValues} formValues={formValues}/>}
      <div className='w-full  py-20 flex h-screen'>
        <div className='w-1/2 justify-center flex'>
          <img src={img} alt="" />
        </div>
        <div className='w-1/2 flex justify-center items-center'>
          <div className=' w-4/6 rounded-xl bg-white flex flex-col gap-4 pl-14 py-11'>
            <h2 className='text-2xl'>Sign Up</h2>

            <Formik
              initialValues={{ email: '', mob: '', password: '', confirm_password: '' }}
              validationSchema={validationSchema}
              onSubmit={async(values, { setSubmitting }) => {
                
                try {
                  const response = await api.post('worker/check-credentials/', { email: values.email, mob:values.mob });
                  
                  if (response.status === 200) {
                    setFormValues(values);
                    console.log(values);
                    setPopup(true); 
                    setCategories(response.data)
                    
                  } else {
                    setErr(response.data);
                  }
                } catch (error) {
                  console.error(error);
                  setErr(error.response?.data?.message || "Something went wrong, please try again.");
                } finally {
                  setSubmitting(false); 
                }
              }}
            >
              {({ isSubmitting, handleChange }) => (
                <Form className='flex flex-col gap-4'>
                  <div>
                    <li className='list-none font-semibold text-[#585858] text-sm mb-1'>Email</li>
                    <Field
                      type="text"
                      name="email"
                      className='border outline-[#3C5267]  w-4/6 py-2 rounded-lg pl-4'
                      onChange={(e)=>{handleChange(e); setErr('')}}
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
                  </div>

                  <div>
                    <li className='list-none font-semibold text-[#585858] text-sm mb-1'>Mobile Number</li>
                    <Field
                      type="text"
                      name="mob"
                      className='border outline-[#3C5267]  w-4/6 py-2 rounded-lg pl-4'
                      onChange={(e)=>{handleChange(e); setErr('')}}
                    />
                    <ErrorMessage name="mob" component="div" className="text-red-500 text-xs" />
                  </div>

                  <div>
                    <li className='list-none font-semibold text-[#585858] text-sm mb-1'>Password</li>
                    <Field
                      type="password"
                      name="password"
                      className='border outline-[#3C5267]  w-4/6 py-2 rounded-lg pl-4'
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
                  </div>

                  <div>
                    <li className='list-none font-semibold text-[#585858] text-sm mb-1'>Confirm Password</li>
                    <Field
                      type="password"
                      name="confirm_password"
                      className='border outline-[#3C5267]  w-4/6 py-2 rounded-lg pl-4'
                    />
                    <ErrorMessage name="confirm_password" component="div" className="text-red-500 text-xs" />
                  </div>
                  <p className='text-red-500 text-xs'>{err}</p>


                  <button
                    type="submit"
                    className='rounded-full bg-[#3c5267de] w-4/6 py-2 text-center cursor-pointer text-white font-semibold tracking-wider'
                    disabled={isSubmitting}
                  >
                    Continue
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
