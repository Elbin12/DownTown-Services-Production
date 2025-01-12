import React from 'react'
import Logo from '../../images/LOGO.png';
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { PiUsersThree } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { TiSpanner } from "react-icons/ti";
import { BiCategory } from "react-icons/bi";


const navItems = [
  { path: '/admin/dashboard/', icon: MdSpaceDashboard, label: 'Dashboard' },
  { path: '/admin/users/', icon: PiUsersThree, label: 'Users' },
  { path: '/admin/workers/', icon: FaUsers, label: 'Workers' },
  { path: '/admin/requests/', icon: FaUsers, label: 'Requests' },
  { path: '/admin/services/', icon: TiSpanner, label: 'Services' },
  { path: '/admin/orders/', icon: TiSpanner, label: 'Orders' },
  { path: '/admin/categories/', icon: BiCategory, label: 'Categories' },
  { path: '/admin/subscriptions/', icon: BiCategory, label: 'Subscriptions' },
]

function Sidebar() {
  const location = useLocation()


  
  return (
    <aside className="w-64 h-screen fixed left-0 top-0 pt-24 bg-teal-50 shadow-lg flex flex-col transition-all duration-300 ease-in-out">
      {/* <div className="p-6 flex justify-center items-center">
        <img src={Logo} alt="Logo" className="h-12 w-auto" />
      </div> */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-3 py-4">
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.path)
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-6 py-4 text-sm font-medium  transition-colors duration-150 ease-in-out
                    ${
                      isActive
                        ? 'bg-[#9abbc9c7] text-primary'
                        : 'text-gray-600 hover:bg-[#b3d0dcc7] hover:text-primary'
                    }`} 
                >
                  <item.icon
                    className={`w-5 h-5 mr-3 ${
                      isActive ? 'text-primary' : 'text-gray-400'
                    }`}
                  />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-teal-100">
        <p className="text-sm text-gray-500 text-center">
          © 2025 DownTown Services
        </p>
      </div>
    </aside>
  )
}

export default Sidebar
