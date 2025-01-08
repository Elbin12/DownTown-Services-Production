import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSelectedService } from '../../redux/worker'
import { Clock, Edit2, Trash2 } from 'lucide-react'
import { api } from '../../axios'
import ToggleSwitch from './ToggleSwitch'


function Service({ service}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isListed, setIsListed] = useState(service.is_listed)

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const handleImageError = () => {
    setIsLoading(false)
  }

  const handleToggleList = async () => {
    try {
      const res = await api.delete(`worker/services/${service.id}/`, {
        is_listed: !isListed
      })
      if (res.status === 200) {
        setIsListed(!isListed)
      }
    } catch (err) {
      console.error("Error toggling service listing", err)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  }

  return (
    <div className='w-3/4 flex bg-white h-48 shadow-md rounded-lg overflow-hidden'>
      <div className='flex flex-col justify-between w-3/4 py-6 px-6'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-semibold text-[#2A2A2A]'>{service.service_name}</h1>
          <p className='text-sm text-gray-600'>{service.description}</p>
          <div className="flex items-center mt-1">
                      <Clock className="w-4 h-4 text-gray-400 mr-1" />
                      <p className="text-xs text-gray-500">
                        {formatDate(service.created_at)}
                      </p>
                    </div>
        </div>
        <div className='flex justify-between items-center w-full'>
          <div className='flex space-x-2'>
            <span className='px-4 bg-[#E5E5E5] py-2 text-xs rounded-full'>24/7 Availability</span>
            <span className='px-4 bg-[#E5E5E5] py-2 text-xs rounded-full'>Fast Response</span>
            <span className='px-4 bg-[#E5E5E5] py-2 text-xs rounded-full'>Professional</span>
          </div>
          <ToggleSwitch
            isChecked={isListed}
            onChange={handleToggleList}
            label={isListed ? "Listed" : "Unlisted"}
          />
        </div>
      </div>
      <div className='relative bg-cover w-3/6 fit overflow-hidden flex justify-end'>
        <div className='bg-[#E9E9E9] absolute opacity-30 w-full h-full'></div>
        <div className='absolute text-stone-800 m-2 flex gap-2'>
          <button
            className='p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200'
            onClick={() => {
              dispatch(setSelectedService(service))
              navigate('/worker/service-edit/')
            }}
          >
            <Edit2 className='w-3 h-3' />
          </button>
        </div>
        {isLoading && (
          <div className="w-full h-full bg-neutral-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-300 via-neutral-200 to-neutral-300 animate-shimmer"></div>
          </div>
        )}
        <img
          src={service.pic}
          alt="Service"
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`w-full h-full object-cover ${isLoading ? 'hidden' : ''}`}
        />
      </div>
    </div>
  )
}

export default Service

