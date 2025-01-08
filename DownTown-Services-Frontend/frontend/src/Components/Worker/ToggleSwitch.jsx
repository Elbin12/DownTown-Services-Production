import { Check, X } from 'lucide-react'
import React from 'react'

const ToggleSwitch= ({ isChecked, onChange, label }) => {
  return (
    <label className="flex items-center cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={onChange}
        />
        <div
          className={`w-14 h-7 rounded-full transition-colors duration-300 ease-in-out ${
            isChecked ? 'bg-green-400' : 'bg-red-500'
          }`}
        >
          <div
            className={`absolute left-1 top-1 w-5 h-5 rounded-full transition-transform duration-300 ease-in-out transform ${
              isChecked ? 'translate-x-7 bg-white' : 'translate-x-0 bg-white'
            }`}
          >
            {isChecked ? (
              <Check className="w-3 h-3 text-green-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            ) : (
              <X className="w-3 h-3 text-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            )}
          </div>
        </div>
      </div>
      <div className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
        {label}
      </div>
    </label>
  )
}

export default ToggleSwitch

