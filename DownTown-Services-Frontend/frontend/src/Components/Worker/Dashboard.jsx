import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line, Bar } from 'react-chartjs-2';
import { api } from '../../axios';
import { setWorkerinfo } from '../../redux/worker';
import AcceptedServices from './AcceptedServices'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

function Dashboard() {
  const workerinfo = useSelector(state => state.worker.workerinfo);
  const dispatch = useDispatch();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('worker/dashboard/');
        if (res.status === 200) {
          setDashboardData(res.data);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const toggleWorkerStatus = async () => {
    const newStatus = !dashboardData.profile_info.is_available;
    try {
      const res = await api.post('worker/dashboard/', { status: newStatus });
      if (res.status === 200) {
        setDashboardData({
          ...dashboardData,
          profile_info: {
            ...dashboardData.profile_info,
            is_available: newStatus
          }
        });
        dispatch(setWorkerinfo({
          ...workerinfo,
          is_available: newStatus,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Chart data for Orders
  const orderChartData = {
    labels: dashboardData.order_stats.daily_orders.map(order => 
      new Date(order.date).toLocaleDateString("en-GB")
    ),
    datasets: [{
      label: 'Daily Orders',
      data: dashboardData.order_stats.daily_orders.map(order => order.count),
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    }]
  };

  // Chart data for Services
  const serviceChartData = {
    labels: dashboardData.service_stats.services_by_category.map(
      service => service.category__category_name
    ),
    datasets: [{
      label: 'Services by Category',
      data: dashboardData.service_stats.services_by_category.map(
        service => service.count
      ),
      backgroundColor: 'rgba(153, 102, 255, 0.5)',
      borderColor: 'rgb(153, 102, 255)',
      borderWidth: 1
    }]
  };

  return (
    <div className="bg-gray-100 min-h-screen mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {dashboardData.profile_info.name}</h1>
            <p className="text-gray-600 mt-2">Subscription: {dashboardData.subscription_metrics.tier_name}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <button
              onClick={toggleWorkerStatus}
              className={`px-4 py-2 rounded-md font-medium focus:outline-none ${
                dashboardData.profile_info.is_available
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {dashboardData.profile_info.is_available ? 'Available' : 'Not Available'}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-4">
          {/* Revenue Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm">Total Revenue</h3>
              <span className="text-green-500">₹</span>
            </div>
            <p className="text-2xl font-bold">{dashboardData.revenue_stats.total_revenue}</p>
            <p className="text-sm text-gray-600">Avg. Order: ₹{dashboardData.revenue_stats.average_order_value.toFixed(2)}</p>
          </div>

          {/* Orders Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm">Total Orders</h3>
              <span className="text-blue-500">📦</span>
            </div>
            <p className="text-2xl font-bold">{dashboardData.order_stats.total_orders}</p>
            <p className="text-sm text-gray-600">Completed: {dashboardData.order_stats.completed_orders}</p>
          </div>

          {/* Services Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm">Active Services</h3>
              <span className="text-purple-500">🛠️</span>
            </div>
            <p className="text-2xl font-bold">{dashboardData.service_stats.total_active_services}</p>
            <p className="text-sm text-gray-600">Listed: {dashboardData.service_stats.total_listed_services}</p>
          </div>

          {/* Rating Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm">Average Rating</h3>
              <span className="text-yellow-500">⭐</span>
            </div>
            <p className="text-2xl font-bold">{dashboardData.review_stats.average_rating.toFixed(1)}</p>
            <p className="text-sm text-gray-600">Total Reviews: {dashboardData.review_stats.total_reviews}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
          <AcceptedServices />
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Order Trends</h3>
            <div className="h-64">
              <Line data={orderChartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Services by Category</h3>
            <div className="h-64">
              <Bar data={serviceChartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>
          <div className="space-y-4">
            {dashboardData.review_stats.recent_reviews.map((review, index) => (
              <div key={index} className="border-b last:border-0 pb-4">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < review.review__rating ? '⭐' : '☆'}
                      </span>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    {new Date(review.review__created_at).toLocaleDateString("en-GB")}
                  </span>
                </div>
                <p className="text-gray-700">{review.review__review}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wallet Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Wallet</h3>
          <div className="mb-4">
            <p className="text-2xl font-bold">₹{dashboardData.wallet_info.current_balance}</p>
            <p className="text-sm text-gray-600">Current Balance</p>
          </div>
          <div className="space-y-2">
            {dashboardData.wallet_info.recent_transactions.map((transaction, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b">
                <span className={transaction.transaction_type === 'credit' ? 'text-green-600' : 'text-red-600'}>
                  {transaction.transaction_type === 'credit' ? '+' : '-'}₹{transaction.amount}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(transaction.created_at).toLocaleDateString("en-GB")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;