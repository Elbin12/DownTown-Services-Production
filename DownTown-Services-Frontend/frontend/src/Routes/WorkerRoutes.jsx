import React from 'react'
import LoginPage from '../Pages/Worker/LoginPage'
import { Route, Routes } from 'react-router-dom'
import SignupPage from '../Pages/Worker/SignupPage'
import ProfilePage from '../Pages/Worker/ProfilePage'
import WorkerProtectedRoute from './WorkerProtectedRoute'
import HomePage from '../Pages/Worker/HomePage'
import AddServicesPage from '../Pages/Worker/AddServicesPage'
import ServicesPage from '../Pages/Worker/ServicesPage'
import ServiceEditPage from '../Pages/Worker/ServiceEditPage'
import ForgotPasswordPage from '../Pages/Worker/ForgotPasswordPage'
import RequestPage from '../Pages/Worker/RequestPage'
import AcceptedServicePage from '../Pages/Worker/AcceptedServicePage'
import OrdersPage from '../Pages/Worker/OrdersPage'
import ResubmitPage from '../Pages/Worker/ResubmitPage'
import WalletPage from '../Pages/Worker/WalletPage'
import Layout from '../Pages/Worker/Layout'
import ChooseSubscriptionsPage from '../Pages/Worker/ChooseSubscriptionsPage'
import CreditPaymentPage from '../Pages/Worker/CreditPaymentPage'
import UpgradePaymentPage from '../Pages/Worker/UpgradePaymentPage'
import UpgradeSubscriptionsPlans from '../Pages/Worker/UpgradeSubscriptionsPlans'

function WorkerRoutes() {
  return (
    <div>
      <Layout >
        <Routes>
          <Route path='/subscription/plans/' element={<WorkerProtectedRoute><ChooseSubscriptionsPage /></WorkerProtectedRoute>} />
          <Route path='/subscription/upgrade/plans/' element={<WorkerProtectedRoute><UpgradeSubscriptionsPlans /></WorkerProtectedRoute>} />
          <Route path='/upgrade/plan/' element={<WorkerProtectedRoute><UpgradePaymentPage /></WorkerProtectedRoute>} />
          <Route path='/credit/' element={<WorkerProtectedRoute><CreditPaymentPage /></WorkerProtectedRoute>} />
          <Route path='/login/' element={<LoginPage />}/>
          <Route path='/resubmit/' element={<ResubmitPage />}/>
          <Route path='/forgot-password/' element={<ForgotPasswordPage />} />
          <Route path='/signup/' element={<SignupPage />}/>
          <Route path='/dashboard/' element={<WorkerProtectedRoute><HomePage /></WorkerProtectedRoute>} />
          <Route path='/profile/' element={<WorkerProtectedRoute><ProfilePage /></WorkerProtectedRoute>} />
          <Route path='/add-service/' element={<WorkerProtectedRoute><AddServicesPage /></WorkerProtectedRoute>} />
          <Route path='/services/' element={<WorkerProtectedRoute><ServicesPage /></WorkerProtectedRoute>} />
          <Route path='/service-edit/' element={<WorkerProtectedRoute><ServiceEditPage /></WorkerProtectedRoute>} />
          <Route path='/requests/' element={<WorkerProtectedRoute><RequestPage /></WorkerProtectedRoute>} />
          <Route path='/services/accepted/:id/' element={<WorkerProtectedRoute><AcceptedServicePage /></WorkerProtectedRoute>} />
          <Route path='/services/accepted/' element={<WorkerProtectedRoute><OrdersPage /></WorkerProtectedRoute>} />
          <Route path='/wallet/' element={<WorkerProtectedRoute><WalletPage /></WorkerProtectedRoute>} />
        </Routes>
      </Layout>
    </div>
  )
}

export default WorkerRoutes
