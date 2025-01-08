import React, { useState } from 'react'
import { api } from '../../axios'
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { useNavigate } from 'react-router-dom';

function SentRequest({isLoaded, setFormValues, setPopup, categories, formValues}) {

  const [isSent, setSent] = useState(false);
  const [error, setError] = useState();

  const [servicesErr, setServicesErr] = useState([]);
  const [expErr, setExpErr] = useState();
  const [certImgErr, setCertImgErr] = useState();
  const [aadharNoErr, setAadharNoErr] = useState('');
  const [locationErr, setLocationErr] = useState('');

  const navigate = useNavigate();

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
    },
    debounce: 300,
  });

  const handleInput = (e) => {
    setLocationErr('')
    setValue(e.target.value);
  };

  const  handleSelect =
    ({ description }) =>
    async() => {
      setValue(description, false);
      clearSuggestions();

      try {
        const results = await getGeocode({ address: description });
        const { lat, lng } = getLatLng(results[0]);
        console.log("📍 Coordinates: ", { lat, lng });
        setFormValues((prevValues) => ({
          ...prevValues, 
          location: description,
          lat: lat,
          lng: lng,
        }));
      } catch (error) {
        console.error("Error fetching geocode or coordinates:", error);
      }
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <h4 className='cursor-pointer hover:bg-yellow-50'><strong>{main_text}</strong> <small>{secondary_text}</small></h4>
        </li>
      );
    });

    
    
  const handleSubmit = async ()=>{

    if (formValues.services === undefined || !formValues.services || formValues.services.length < 1) {
      return setServicesErr('Please select the services');
    }else if(!formValues.aadhaar_no){
      return setAadharNoErr('This field is required')
    }else if(formValues.aadhaar_no.length < 12){
      return setAadharNoErr('Enter valid aadhar number')
    }else if(!formValues.certificate){
      return setCertImgErr('This field is required')
    }else if(!formValues.experience.trim()){
      return setExpErr('This field is required')
    }else if(!formValues.location){
      return setLocationErr('This field is required')
    }else if(!formValues.services){
      return setServicesErr('This field is required')
    }


    const formData = new FormData();

    for (const key in formValues) {
      if (formValues[key] instanceof File) {
        formData.append(key, formValues[key]); // Add the file
      } else if (Array.isArray(formValues[key])) {
        formData.append(key, JSON.stringify(formValues[key])); // Add array as string
      } else {
        formData.append(key, formValues[key]); // Add other fields normally
      }
    }
    console.log("Updated formValues: ", formData);
    try{
      const res = await api.post('worker/signup/', formData)
      console.log(res);
      if (res.status === 200){
        setSent(true);
      }
      else{
        setError(res.response.data)
      }
    }catch(err){
      console.log(err, 'err')
    }
  }

  const handleCategorySelect = (cat)=>{
    setServicesErr('')
    setFormValues((prevValues) => {
      const isSelected = prevValues.services?.includes(cat.id);
      const updatedCategories = isSelected? prevValues.services.filter((id) => id !== cat.id) : [...(prevValues.services || []), cat.id];

      return {
        ...prevValues,
        services: updatedCategories,
      };
    });
  };

  console.log('catt', formValues);

  console.log("Status:", status);
  console.log("Suggestions data:", data);

  return (
    <div className='w-full h-screen fixed flex top-0 justify-center bg-[#39393999]' onClick={()=>{setPopup(false)}}>
      <div onClick={(e)=>e.stopPropagation()} className='w-3/4 bg-white my-16 flex flex-col gap-4 px-16 py-9 rounded-lg'>
        <h2 className='font-semibold text-[#000000c6]'>Select the services that you are good at:</h2>
        <div className='bg-[#e9e3b43f] rounded-lg'>
          <div className='p-9 flex flex-wrap gap-6'>
            {categories.map((category, index) => (
              <div key={index} className={`py-2 px-5 select-none rounded shadow cursor-pointer font-semibold text-stone-500 ${formValues?.services?.includes(category.id)&&'shadow bg-[#41657dde] text-white'}`} onClick={()=>{handleCategorySelect(category)}}>
                {category.category_name}
              </div>
            ))}
          </div>
          <p className='text-red-500 text-xs px-9 pb-1'>{servicesErr}</p>
        </div>
        <div  className='flex flex-col gap-5'>
          <div className='flex justify-between px-6'>
            <div className='w-2/6'>
              <li className='list-none mb-1'>Aadhaar Number</li>
              <input type="number" className='border rounded-lg py-1 w-full outline-none px-2' 
              onChange={(e)=>{setFormValues((prevValues) => ({
                  ...prevValues, 
                  aadhaar_no: e.target.value}));
                  setAadharNoErr('')
              }}/>
              <p className='text-red-500 text-xs'>{aadharNoErr}</p>
            </div>
            <div className='w-2/6'> 
              <li className='list-none mb-1'>Upload your certificate</li>
              <input type="file" className='border rounded-lg py-1 w-full outline-none px-2' 
                onChange={(e)=>{setFormValues((prevValues) => ({
                  ...prevValues, 
                  certificate: e.target.files[0]}));
                  setCertImgErr('')
              }}
              
              />
              <p className='text-red-500 text-xs'>{certImgErr}</p>
            </div>
          </div>
          <div className='flex justify-between px-6'>
            <div className='w-2/6'>
              <li className='list-none mb-1'>How much experience do you have ?</li>
              <input type="text" className='border rounded-lg py-1 w-full outline-none px-2' 
                onChange={(e)=>{setFormValues((prevValues) => ({
                  ...prevValues, 
                  experience: e.target.value}));
                  setExpErr('')
              }}/>
              <p className='text-red-500 text-xs'>{expErr}</p>
            </div>
            <div className='w-2/6'> 
              <li className='list-none mb-1'>Your location</li>
              {/* <input type="text" className='border rounded-lg py-1 w-full outline-none px-2' /> */}
              <input
                value={value} className='border rounded-lg py-1 w-full outline-none px-2'
                onChange={handleInput}
                disabled={!ready}
              />
              <p className='text-red-500 text-xs'>{locationErr}</p>
              {status === "OK" && <ul>{renderSuggestions()}</ul>}
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col gap-2 items-center mt-9'>
            {!isSent&&<h3 className='rounded-full bg-[#3c5267de] w-2/6 py-2 text-center cursor-pointer text-white font-semibold tracking-wider' onClick={handleSubmit}>Sent a Request</h3>}
            {isSent&&<h3 className='rounded-full bg-[#4aae3ed1] w-2/6 py-2 text-center text-white font-semibold tracking-wider'>Request sent</h3>}
            {isSent&&<p className='text-sm'>You will gain access to additional pages once approved by the admin. <span onClick={()=>navigate('/worker/')} className='hover:underline hover:text-yellow-400 cursor-pointer'>Please go to the login</span></p>}
        </div>
      </div>
    </div>
  )
}

export default SentRequest
