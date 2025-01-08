import React, { useEffect, useState } from 'react'
import AcceptedServices from './AcceptedServices'
import ServiceChart from './ServiceChart'
import SalesChart from './SalesChart'
import { api } from '../../axios'
import { useDispatch, useSelector } from 'react-redux'
import { setWorkerinfo } from '../../redux/worker'

function Dashboard() {
  const workerinfo = useSelector(state => state.worker.workerinfo)

  const [isAvailable, setIsAvailable] = useState(workerinfo?.is_available)
  const [revenue, setRevenue] = useState(0)
  const [servicesCount, setServicesCount] = useState(0)
  const [averageRating, setAverageRating] = useState(0)
  const [revenueLastWeek, setRevenueLastWeek] = useState(0)
  const [ordersLastWeek, setOrdersLastWeek] = useState(0)
  const [labels, setLabels] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('worker/dashboard/')
        if (res.status === 200) {
          setIsAvailable(res.data.status)
          setRevenue(res.data.revenue)
          setServicesCount(res.data.services_count)
          setAverageRating(res.data.average_rating)
          setRevenueLastWeek(res.data.revenue_last_week)
          setOrdersLastWeek(res.data.orders_last_week);
          setLabels(res.data.labels)
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchDashboardData()
  }, [])

  const toggleWorkerStatus = async () => {
    const newStatus = !isAvailable
    setIsAvailable(newStatus)
    try {
      const res = await api.post('worker/dashboard/', { status: newStatus })
      if (res.status === 200) {
        dispatch(setWorkerinfo({
          ...workerinfo,
          is_available: res.data.status,
        }))
      }
    } catch (err) {
      console.error(err)
      setIsAvailable(!newStatus)
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleWorkerStatus}
                className={`px-4 py-2 rounded-md font-medium focus:outline-none  ${
                  isAvailable
                    ? 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500'
                    : 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500'
                }`}
              >
                {isAvailable ? 'Available' : 'Not Available'}
              </button>
              <span className="text-sm text-gray-500">
                {isAvailable ? 'You are currently available for work' : 'You are not available for work'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Revenue</dt>
                    <dd className="text-3xl font-semibold text-gray-900">₹{revenue}</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">View all</a>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Services Completed</dt>
                    <dd className="text-3xl font-semibold text-gray-900">{servicesCount}</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="#" className="font-medium text-green-600 hover:text-green-500">View details</a>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Average Rating</dt>
                    <dd className="text-3xl font-semibold text-gray-900">{averageRating.toFixed(1)}</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="#" className="font-medium text-yellow-600 hover:text-yellow-500">See all reviews</a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Sales Overview</h2>
              <SalesChart ordersLastWeek={ordersLastWeek} revenueLastWeek={revenueLastWeek} labels={labels}/>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Services Overview</h2>
              <ServiceChart />
            </div>
          </div>
        </div>
        <div className="">
            <AcceptedServices />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

