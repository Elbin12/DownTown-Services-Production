import React, { useEffect } from 'react';
import benglaru from '../../images/locations/benglaru.png';
import kochi from '../../images/locations/kochi.png';
import mumbai from '../../images/locations/mumbai.png';
import delhi from '../../images/locations/delhi.png';
import kolkata from '../../images/locations/kolkata.png';
import chennai from '../../images/locations/chennai.png';
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { useLoadScript } from "@react-google-maps/api";
import { api } from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserinfo } from '../../redux/user';
import { setWorkerinfo } from '../../redux/worker';
import { setLocationDetails } from '../../redux/anonymous_user';

function Location({role, location, setLocation, setActivePopup}) {

  const dispatch = useDispatch();


    const userinfo = useSelector(state=>state.user.userinfo)

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete({
        requestOptions: {
          componentRestrictions: { country: "IN" }, 
        },
        debounce: 300,
      });

      useEffect(() => {
        if (location) {
            setValue(location, false);
        }
      }, [location, setValue]);
    
      const handleInput = (e) => {
        setValue(e.target.value);
      };
    
      const  handleLocationSelect  = async(description) => {
          console.log(description, 'desc');
          
          try{
            const results = await getGeocode({ address: description });
            const { lat, lng } = getLatLng(results[0]);
            console.log("📍 Coordinates: ", { lat, lng }, results);

            const data = {
              lat:lat,
              lng:lng,
              location:description
            }
            if(role ==='user'){
                const res = await api.post('change-location/', data)
                if (res.status === 200){
                  console.log(res.data, 'data');
                  setActivePopup('')
                  if (userinfo){
                    dispatch(setUserinfo(res.data));
                  }else{
                    dispatch(setLocationDetails(res.data))
                  }
                  setValue(description, false);
                  setLocation(description);
                  window.location.reload();
                  clearSuggestions();
                }
            }else if(role ==='worker'){
                const res = await api.post('worker/change-location/', data)
                if (res.status === 200){
                  console.log(res.data, 'data');
                  setActivePopup('')
                  dispatch(setWorkerinfo(res.data));
                  setValue(description, false);
                  setLocation(description);
                  window.location.reload();
                  clearSuggestions();
              }
              }
          }catch(err){
            console.log(err, 'err');
          }
        };
      
      const handleSelect = ({ description }) => () => handleLocationSelect(description);
    
      const renderSuggestions = () =>
        data.filter((suggestion) => {
          const { main_text, secondary_text } = suggestion.structured_formatting;
          return (
            main_text.toLowerCase().includes(value.toLowerCase()) && // Matches user input
            secondary_text && secondary_text.includes("India")       // Matches India in location
          );
        })
        .map((suggestion, index) => {
          const {
            place_id,
            structured_formatting: { main_text },
          } = suggestion;
  
    
          return (
            <li key={place_id} onClick={handleSelect(suggestion)}>
              <h4 className={`cursor-pointer hover:bg-stone-50 text-sm font-semibold border-t px-3 py-1 rounded-lg ${index !== 0 ? 'border-t' : ''}`}>{main_text}</h4>
            </li>
          );
        });

  return (
    <div className='fixed bg-[#39393999] w-full h-screen flex justify-center min-h-screen items-center p-5 top-0 z-30' onClick={()=>{setActivePopup('')}}>
        <div className='bg-white w-3/5 py-9 flex flex-col justify-around gap-9 items-center' onClick={(e)=>e.stopPropagation()}>
            <h1 className='font-semibold'>SELECT YOUR CITY TO CONTINUE</h1>
            <div className='w-full flex flex-col items-center'>
                <div className='border w-3/4 py-2 rounded-lg'>
                    <input type="text" value={value} onChange={handleInput} disabled={!ready} className='outline-none w-full text-center' placeholder='Search Your City'/>
                </div>
                <div className=' w-3/4 shadow-md shadow-stone-500 rounded-lg'>
                    {status === "OK" && <ul>{renderSuggestions()}</ul>}
                </div>
            </div>
            <div className='flex flex-col text-center px-36 gap-9'>
                <h2 className='font-semibold'>POPULAR CITIES</h2>
                <div className='flex gap-x-20 gap-y-6 justify-center flex-wrap'>
                    <div className='cursor-pointer' onClick={()=>{handleLocationSelect('Benglaru')}}>
                        <img src={benglaru} alt="" />
                        <h4>Benglaru</h4>
                    </div>
                    <div className='cursor-pointer' onClick={()=>{handleLocationSelect('Kochi')}}>
                        <img src={kochi} alt="" />
                        <h4>Kochi</h4>
                    </div>
                    <div className='cursor-pointer' onClick={()=>{handleLocationSelect('Mumbai')}}>
                        <img src={mumbai} alt="" />
                        <h4>Mumbai</h4>
                    </div>
                    <div className='cursor-pointer' onClick={()=>{handleLocationSelect('Delhi')}}>
                        <img src={delhi} alt="" />
                        <h4>Delhi NCR</h4>
                    </div>
                    <div className='cursor-pointer' onClick={()=>{handleLocationSelect('Kolkata')}}>
                        <img src={kolkata} alt="" />
                        <h4>Kolkata</h4>
                    </div>
                    <div className='cursor-pointer' onClick={()=>{handleLocationSelect('Chennai')}}>
                        <img src={chennai} alt="" />
                        <h4>Chennai</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Location
