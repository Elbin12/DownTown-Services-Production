import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, ChevronRight, Loader2 } from 'lucide-react'
import { api } from '../../axios'

function AcceptedServices() {
  const [acceptedServices, setAcceptedServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAcceptedServices = async () => {
      try {
        setIsLoading(true)
        const res = await api.get('worker/accepted-requests/')
        if (res.status === 200) {
          setAcceptedServices(res.data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAcceptedServices()
  }, [])

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
    <div className="bg-white w-1/3 shadow-md rounded overflow-hidden">
      <div className="flex justify-between items-center py-4 px-6 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Accepted Services</h2>
        <button
          onClick={() => navigate('/worker/services/accepted')}
          className="text-sm font-semibold text-stone-600 hover:text-yellow-600 transition-colors duration-200 flex items-center"
        >
          View All
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      <div className="p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : acceptedServices.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {acceptedServices.map((service) => (
              <li key={service.id} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={service.service_image}
                      alt={service.service_name}
                      className="w-28 h-16 object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {service.service_name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {service.user_description}
                    </p>
                    <div className="flex items-center mt-1">
                      <Clock className="w-4 h-4 text-gray-400 mr-1" />
                      <p className="text-xs text-gray-500">
                        {formatDate(service.created_at)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => navigate(`/worker/services/accepted/${service.id}/`)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No accepted services at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AcceptedServices

