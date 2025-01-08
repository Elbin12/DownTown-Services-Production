import React, { useState } from 'react'
import { X, Upload } from 'lucide-react'
import { api } from '../../axios'

function ReportModal({orderId, onClose}) {
    const [reason, setReason] = useState('')
    const [file, setFile] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
  
    const handleFileChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        setFile(e.target.files[0])
      }
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      setIsSubmitting(true)
  
      const formData = new FormData()
      formData.append('reason', reason)
      if (file) {
        formData.append('file', file)
      }
  
      try {
        const response = await api.post(`order/${orderId}/report/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        if (response.status === 200) {
          // Handle successful report submission
          onClose()
        }
      } catch (error) {
        console.error('Error submitting report:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Report Service</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                Reason for Report
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-2 border border-gray-300 h-20 rounded-md focus:outline-none py-2"
                rows={4}
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                Upload Image or Video
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="file"
                  className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center py-4">
                    <Upload className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                  </div>
                  <input id="file" type="file" className="hidden" onChange={handleFileChange} accept="image/*,video/*" />
                </label>
              </div>
              {file && <p className="mt-2 text-sm text-gray-500">{file.name}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-[#566d81] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </form>
        </div>
      </div>
    )
}

export default ReportModal

