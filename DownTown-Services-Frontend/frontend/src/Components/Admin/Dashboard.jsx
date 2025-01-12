import React, { useEffect, useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Users, Briefcase, ShoppingBag, DollarSign, Star, Wallet } from 'lucide-react';
import { api } from '../../axios';
import { BiRupee } from 'react-icons/bi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your actual API endpoint
    const fetchData = async ()=>{
        try{
            const res = await api.get('admin/dashboard/')
            if (res.status === 200){
                setDashboardData(res.data);
                setLoading(false);
            }
        }catch(err){
            console.error('Error fetching dashboard data:', err);
            setLoading(false);
        }
    }
     
    fetchData();
  }, []);


  const revenueData = {
    labels: dashboardData?.revenue_stats.monthly_revenue.map(item => 
      new Date(item.month).toLocaleDateString('default', { month: 'short' })
    ),
    datasets: [{
      label: 'Monthly Revenue',
      data: dashboardData?.revenue_stats.monthly_revenue.map(item => item.total),
      fill: true,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.4
    }]
  };

  const orderStatusData = {
    labels: dashboardData?.order_stats.orders_by_status.map(item => item.status),
    datasets: [{
      data: dashboardData?.order_stats.orders_by_status.map(item => item.count),
      backgroundColor: [
        'rgba(255, 206, 86, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(255, 99, 132, 0.7)'
      ],
    }]
  };

  const categoryData = {
    labels: dashboardData?.service_stats.services_by_category.map(item => item.category_name),
    datasets: [{
      label: 'Services by Category',
      data: dashboardData?.service_stats.services_by_category.map(item => item.service_count),
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)'
      ]
    }]
  };

  const subscriptionData = {
    labels: dashboardData?.subscription_stats.subscription_by_tier.map(item => item.tier_name),
    datasets: [{
      label: 'Subscriptions by Tier',
      data: dashboardData?.subscription_stats.subscription_by_tier.map(item => item.count),
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
      ]
    }]
  };

  return (
    <div className="w-screen bg-gray-50 flex items-center justify-end overflow-y-auto pr-10">
      <div className="w-4/5 flex flex-col gap-8 mt-28 pb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<Users className="w-6 h-6 text-blue-600" />}
            title="Total Users"
            value={dashboardData?.user_stats.total_users}
          />
          <StatCard
            icon={<Briefcase className="w-6 h-6 text-green-600" />}
            title="Active Workers"
            value={dashboardData?.worker_stats.active_workers}
            subtitle={`${dashboardData?.worker_stats.verified_workers} verified`}
          />
          <StatCard
            icon={<ShoppingBag className="w-6 h-6 text-purple-600" />}
            title="Total Orders"
            value={dashboardData?.order_stats.total_orders}
          />
          <StatCard
            icon={<BiRupee className="w-6 h-6 text-yellow-600" />}
            title="Total Revenue"
            value={`₹ ${dashboardData?.revenue_stats.total_revenue}`}
          />
          <StatCard
            icon={<Users className="w-6 h-6 text-blue-600" />}
            title="Subscribed Workers"
            value={dashboardData?.subscription_stats.total_subscribed_workers}
          />
          <StatCard
            icon={<ShoppingBag className="w-6 h-6 text-purple-600" />}
            title="Pending Requests"
            value={dashboardData?.request_stats.pending_requests}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Revenue Overview">
            <Line data={revenueData} />
          </ChartCard>
          <ChartCard title="Order Status Distribution">
            <div className="h-[200px] flex justify-center px-20">
              <Doughnut 
                data={orderStatusData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right'
                    }
                  }
                }}
              />
            </div>
          </ChartCard>
          <ChartCard title="Services by Category">
            <Bar data={categoryData} />
          </ChartCard>
          <ChartCard title="Subscriptions by Tier">
          <div className="h-[200px] flex justify-center px-20">
              <Doughnut 
                data={subscriptionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right'
                    }
                  }
                }}
              />
            </div>
          </ChartCard>
        </div>

        {/* Recent Transactions */}
        {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-800 p-6 border-b border-gray-200">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData?.wallet_stats.recent_transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{transaction.type}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                      ₹ {transaction.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-800 p-6 border-b border-gray-200">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData?.order_stats.recent_orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.service_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.user}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.provider}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{order.service_price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, change, subtitle }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-full bg-gray-100">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
    {change !== undefined && (
      <div className="mt-4">
        <span className={`text-sm font-medium ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}
        </span>
        <span className="text-gray-400 text-sm ml-2">vs last month</span>
      </div>
    )}
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6  rounded-xl shadow-sm border border-gray-200">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
    {children}
  </div>
);

export default Dashboard;

